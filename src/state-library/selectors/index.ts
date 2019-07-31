import { allDataSelector } from "./allDataSelector";

interface Selectors {
  allDataSelector: () => ReturnType<typeof allDataSelector>;
}

export { allDataSelector, Selectors };
