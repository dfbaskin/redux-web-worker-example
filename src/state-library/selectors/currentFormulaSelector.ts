import { createSelector } from "reselect";
import { stateSelector } from "./stateSelector";

export const currentFormulaSelector = createSelector(
  stateSelector,
  state => {
    const { columns, formulas, selectedColumnIndex } = state;

    return selectedColumnIndex === undefined
      ? {
          formula: "",
          columnId: ""
        }
      : {
          formula: formulas[selectedColumnIndex] || "",
          columnId: `C${selectedColumnIndex + 1}`
        };
  }
);
