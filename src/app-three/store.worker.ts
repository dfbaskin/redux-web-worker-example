import { exposeStore } from "redux-in-worker";

import { store } from "../state-library/appStore";

exposeStore(store);
