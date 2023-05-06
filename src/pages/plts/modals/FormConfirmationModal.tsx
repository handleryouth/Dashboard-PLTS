import { Button } from "components";
import { Dialog } from "primereact/dialog";

export interface FormConfirmationModalProps {
  visible: boolean;
  toggleClosedModal: () => void;
  onSubmit: () => void;
}

export default function FormConfirmationModal({
  toggleClosedModal,
  visible,
  onSubmit,
}: FormConfirmationModalProps) {
  return (
    <Dialog
      blockScroll
      draggable={false}
      header="Confirmation"
      visible={visible}
      onHide={toggleClosedModal}
    >
      <p className="prose">
        Before you proceed to save, please double-check the data that you have
        entered. Pay particular attention to the following:
      </p>

      <ul className="list-disc prose">
        <li>
          Value precision: Make sure that you have entered numerical values with
          the appropriate number of decimal places. Inaccurate values can lead
          to errors in calculations and other issues.
        </li>
        <li>
          Value unit: Ensure that you have used the correct units of measurement
          for your data. Using different units can create confusion and affect
          the accuracy of your results.
        </li>
        <li>
          Power data from inverter: Please note that power data from inverters
          must be entered in watts. This is important to ensure consistency and
          accuracy in your data.
        </li>
      </ul>

      <div className="flex items-center justify-between gap-x-4 mt-4">
        <Button onClick={onSubmit} className="w-full bg-blue-500">
          Save
        </Button>
        <Button className="w-full bg-red-500">Check Again</Button>
      </div>
    </Dialog>
  );
}
