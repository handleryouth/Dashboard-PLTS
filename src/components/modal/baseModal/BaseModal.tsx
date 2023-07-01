import { ReactNode } from "react";
import { Dialog, DialogProps } from "primereact/dialog";

export interface BaseModalProps extends DialogProps {
  visible: boolean;
  text?: string;
  children?: ReactNode;
}

export default function BaseModal({
  text,
  children,
  ...props
}: BaseModalProps) {
  return (
    <Dialog {...props} draggable={false}>
      {text ?? children}
    </Dialog>
  );
}
