import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button, Calendar } from "components";
import { CSVModalProps } from "types";
import { INITIAL_STATE_DATE } from "const";

export default function CSVModal({
  onCancel,
  onConfirm,
  visible,
}: CSVModalProps) {
  const [filterDate, setFilterDate] = useState(INITIAL_STATE_DATE);

  return (
    <Dialog
      onHide={onCancel}
      visible={visible}
      className="prose"
      footer={
        <div>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onConfirm(filterDate)}>Confirm </Button>
        </div>
      }
    >
      <h3 className="mt-0 mb-4">Select Date for CSV File</h3>
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
          className="w-auto"
          value={filterDate.endDate}
          onChange={(e) =>
            setFilterDate((prevState) => ({
              ...prevState,
              endDate: e.value as Date,
            }))
          }
        />
      </div>
    </Dialog>
  );
}
