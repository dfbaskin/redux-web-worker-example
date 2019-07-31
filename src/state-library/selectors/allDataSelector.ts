import { createSelector } from "reselect";
import { stateSelector } from "./stateSelector";

export const allDataSelector = createSelector(
  stateSelector,
  ({ columns, data }) => ({
    columns,
    data
  })
);
