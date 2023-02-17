import { ReactElement } from "react";

export type TableContent = string | ReactElement;

export interface TableComponentProps<T> {
  data?: T[];
  columns: Partial<Record<keyof T, string>>;
  renderItem: (item: T) => Partial<Record<keyof T, TableContent>>;
  onClickRowItem?: (item: T) => void;
  keyItem: (item: T) => string;
}
