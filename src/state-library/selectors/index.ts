import { allDataSelector } from "./allDataSelector";

interface Selectors {
  allDataSelector: () => ReturnType<typeof allDataSelector>;
}

const WithSelector = {
  allDataSelector: (selectors: Selectors) => selectors.allDataSelector
};

export { allDataSelector, Selectors, WithSelector };
