import { useCallback, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button, Calendar } from "components";
import { requestHelper } from "utils";

export interface FilterModalProps {
  visible: boolean;
  pltsName: string;
  toggleCloseModal: () => void;
}

export interface FilterModalStateProps {
  startDate?: Date;
  endDate?: Date;
}

export const INITIAL_STATE_DATE: FilterModalStateProps = {
  startDate: new Date(),
  endDate: new Date(),
};

export default function FilterModal({
  toggleCloseModal,
  visible,
  pltsName,
}: FilterModalProps) {
  const [filterDate, setFilterDate] = useState(INITIAL_STATE_DATE);

  const downloadCSVFile = useCallback(async () => {
    const data = await requestHelper("get_plts_average_file", {
      params: {
        pltsName,
        endDate: filterDate.endDate?.toISOString(),
        startDate: filterDate.startDate?.toISOString(),
      },
    });

    if (data && data.status === 200) {
      const url = window.URL.createObjectURL(
        new Blob([data.data.data], {
          type: "text/csv",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
    }
  }, [filterDate, pltsName]);

  return (
    <Dialog
      visible={visible}
      onHide={toggleCloseModal}
      header={<h3>Download CSV</h3>}
    >
      <div className="flex items-center gap-x-4">
        <Calendar
          label="Start Date"
          value={filterDate.startDate}
          onChange={(e) =>
            setFilterDate((prevState) => ({
              ...prevState,
              startDate: e.value as Date,
            }))
          }
        />

        <Calendar
          label="End Date"
          value={filterDate.endDate}
          onChange={(e) =>
            setFilterDate((prevState) => ({
              ...prevState,
              endDate: e.value as Date,
            }))
          }
        />
      </div>

      <div className="mt-4 flex items-center w-full gap-x-4">
        <Button className="w-full" onClick={downloadCSVFile}>
          Filter
        </Button>
        <Button className="w-full">Cancel</Button>
      </div>
    </Dialog>
  );
}
