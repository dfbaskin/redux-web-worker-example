import { dataViewSelector } from "./dataViewSelector";
import { currentFormulaSelector } from "./currentFormulaSelector";

interface Selectors {
  dataViewSelector: () => ReturnType<typeof dataViewSelector>;
  currentFormulaSelector: () => ReturnType<typeof currentFormulaSelector>;
}

const WithSelector = {
  dataViewSelector: (selectors: Selectors) => selectors.dataViewSelector,
  currentFormulaSelector: (selectors: Selectors) =>
    selectors.currentFormulaSelector
};

export { dataViewSelector, currentFormulaSelector, Selectors, WithSelector };
