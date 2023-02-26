import { useState, useCallback } from "react";
import MonitoringChart from "./MonitoringChart";
import { Button } from "components";
import { AddGraphModal, AddGraphModalFormProps } from "./modals";

export default function MonitoringDashboard() {
  const [graphList, setGraphList] = useState<string[]>([]);

  const [showModal, setShowModal] = useState(false);

  const handleAddGraphEvent = useCallback(
    (data: AddGraphModalFormProps) => {
      if (graphList.length < 4) {
        setGraphList((prevState) => [...prevState, data.graphName]);
      } else {
        setGraphList((prevState) => [...prevState.slice(1), data.graphName]);
      }
    },
    [graphList.length]
  );

  return (
    <>
      <AddGraphModal
        toggleCloseModal={() => setShowModal(false)}
        visible={showModal}
        onSubmitModal={handleAddGraphEvent}
      />
      <div>
        <div className="flex items-center justify-between">
          <h3 className="my-0">Monitoring Dashboard</h3>
          <Button className="bg-blue-500" onClick={() => setShowModal(true)}>
            Show new graph
          </Button>
        </div>

        <div className="grid grid-cols-1 mediumToBigDisplay:grid-cols-2 mb-8 gap-8 items-center justify-center ">
          {graphList.map((item, index) => {
            return (
              <MonitoringChart
                key={index}
                title={item}
                onButtonClicked={() =>
                  setGraphList((prevState) =>
                    prevState.filter((currentItem) => currentItem !== item)
                  )
                }
                buttonTitle="Remove graph"
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
