import { allDataSelector } from "./allDataSelector";
import { dataViewSelector } from "./dataViewSelector";

interface Selectors {
  allDataSelector: () => ReturnType<typeof allDataSelector>;
  dataViewSelector: () => ReturnType<typeof dataViewSelector>;
}

const WithSelector = {
  allDataSelector: (selectors: Selectors) => selectors.allDataSelector,
  dataViewSelector: (selectors: Selectors) => selectors.dataViewSelector
};

export { allDataSelector, dataViewSelector, Selectors, WithSelector };
