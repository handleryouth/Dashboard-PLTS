import { ReactNode } from "react";
import { PltsUnitProps } from "../../pages";

export type RenderedChartItem<T> = Record<keyof T, string | number | undefined>;

export interface LineChartProps<T extends Object> {
  title?: string;
  singleChartData?: T[];
  multipleChartData?: T[];
  multipleChartDataKey?: string[];
  containerClassName?: string;
  renderItem: (item: T) => RenderedChartItem<T>;
  customDropdownComponent?: ReactNode;
  coordinate: {
    x: keyof T;
    y?: keyof T;
  };
  allowZoom?: boolean;
  isLoading?: boolean;
  xUnit?: string;
  yUnit?: string;
}
