import { ReactNode } from "react";

export interface TableActionSearchProps {
  search: string;
}

export interface TableActionProps {
  onSubmit: (data: TableActionSearchProps) => void;
  buttonTitle?: string;
  customButtonComponent?: ReactNode;
  onButtonClick?: () => void;
  enableButton?: boolean;
}
