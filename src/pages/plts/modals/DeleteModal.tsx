import { Button } from "components";
import { ConfirmDialog } from "primereact/confirmdialog";

export interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

export default function DeleteModal({
  onCancel,
  onConfirm,
  visible,
}: DeleteModalProps) {
  return (
    <ConfirmDialog
      visible={visible}
      onHide={onCancel}
      accept={onConfirm}
      reject={onCancel}
      message="Are you sure you want to delete?"
      footer={
        <div className="flex items-center ">
          <Button onClick={onConfirm} className="!w-full">
            Delete
          </Button>
          <Button onClick={onCancel} className="!w-full">
            Cancel
          </Button>
        </div>
      }
    />
  );
}
