export interface FilterModalStateProps {
  startDate: Date;
  endDate: Date;
}

export interface CSVModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (data: FilterModalStateProps) => void;
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

export interface PositionModalProps {
  toggleModalClosed: () => void;
  visible: boolean;
  onRequestCompleted: () => void;
}

export interface AddGraphModalProps {
  visible: boolean;
  toggleCloseModal: () => void;
  onSubmitModal: (item: AddGraphModalFormProps) => void;
}

export interface AddGraphModalFormProps {
  graphName: string;
}

export interface DeleteModalStateProps {
  visible: boolean;
  name: string;
  id: string;
}
