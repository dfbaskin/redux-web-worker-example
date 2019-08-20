import { createSelector } from "reselect";
import { stateSelector } from "./stateSelector";

export const currentFormulaSelector = createSelector(
  stateSelector,
  state => {
    const { columns, formulas, selectedColumnIndex } = state;

    return selectedColumnIndex === undefined
      ? {
          formula: "",
          columnId: "",
          columnIndex: -1
        }
      : {
          formula: formulas[selectedColumnIndex] || "",
          columnId: `C${selectedColumnIndex + 1}`,
          columnIndex: selectedColumnIndex
        };
  }
);
