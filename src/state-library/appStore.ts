import { reducer } from "./actions";
import { createStore } from "redux";

const store = createStore(reducer);

export { store };
