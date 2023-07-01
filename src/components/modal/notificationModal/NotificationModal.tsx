import { BaseModal } from "../baseModal";
import { Button } from "../../button";

export interface NotificationModalProps {
  visible: boolean;
  onButtonClicked: () => void;
  buttonText?: string;
  message: string;
}

export default function NotificationModal({
  message,
  onButtonClicked,
  visible,
  buttonText = "Close",
}: NotificationModalProps) {
  return (
    <BaseModal header="Notification" visible={visible} onHide={onButtonClicked}>
      <p className="prose text-center">{message}</p>
      <Button className="mt-4 w-full" onClick={onButtonClicked}>
        {buttonText}
      </Button>
    </BaseModal>
  );
}
