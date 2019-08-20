import { ApplicationState } from "./appState";
import { rootReducer, rootEpic } from "./actions";
import { Action, applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";

const epicMiddleWare = createEpicMiddleware<Action, Action, ApplicationState>();

const store = createStore(rootReducer, applyMiddleware(epicMiddleWare));

epicMiddleWare.run(rootEpic);

export { store };
