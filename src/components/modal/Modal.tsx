import React, { ReactNode } from "react";
import { Dialog, DialogProps } from "primereact/dialog";

export interface ModalProps extends DialogProps {
  visible: boolean;
  text?: string;
  children?: ReactNode;
}

export default function Modal({ text, children, ...props }: ModalProps) {
  return (
    <Dialog {...props} draggable={false}>
      {text ?? children}
    </Dialog>
  );
}
