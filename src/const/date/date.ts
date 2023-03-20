import { FilterModalStateProps } from "types";

export const INITIAL_STATE_DATE: FilterModalStateProps = {
  startDate: new Date(new Date().setHours(0, 0, 0, 0)),
  endDate: new Date(),
};
