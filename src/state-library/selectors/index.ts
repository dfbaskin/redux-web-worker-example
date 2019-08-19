import { allDataSelector } from "./allDataSelector";
import { dataViewSelector } from "./dataViewSelector";
import { currentFormulaSelector } from "./currentFormulaSelector";

interface Selectors {
  allDataSelector: () => ReturnType<typeof allDataSelector>;
  dataViewSelector: () => ReturnType<typeof dataViewSelector>;
  currentFormulaSelector: () => ReturnType<typeof currentFormulaSelector>;
}

const WithSelector = {
  allDataSelector: (selectors: Selectors) => selectors.allDataSelector,
  dataViewSelector: (selectors: Selectors) => selectors.dataViewSelector,
  currentFormulaSelector: (selectors: Selectors) =>
    selectors.currentFormulaSelector
};

export {
  allDataSelector,
  dataViewSelector,
  currentFormulaSelector,
  Selectors,
  WithSelector
};
