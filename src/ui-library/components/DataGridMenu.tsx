import React, {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState
} from "react";
import { AppStoreContext } from "../../state-library/AppStoreContext";
import {
  addRandomDataColumnAction,
  applyFormulaAction
} from "../../state-library/actions";
import { useStateSelector, WithSelector } from "../hooks/useStateSelector";

import "./DataGridMenu.scss";

export function DataGridMenu() {
  const { columnId, formula, columnIndex } = useStateSelector(
    WithSelector.currentFormulaSelector
  ) || {
    columnId: "",
    formula: "",
    columnIndex: -1
  };
  const { dispatch } = useContext(AppStoreContext);
  const [editFormula, setEditFormula] = useState(formula);
  useEffect(() => {
    setEditFormula(formula);
  }, [columnId, formula]);
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEditFormula(evt.target.value);
  };
  const onKeyUp = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      dispatch(
        applyFormulaAction({
          columnIndex,
          formula: editFormula
        })
      );
    }
  };
  return (
    <div className="grid-menu">
      <div>
        <span>Add Column:</span>
        <span>
          <button
            type="button"
            onClick={() => dispatch(addRandomDataColumnAction())}
          >
            Random Data
          </button>
        </span>
      </div>
      {columnId && (
        <div>
          <label>
            <span>{columnId}:</span>
            <input
              type="text"
              onChange={onChange}
              onKeyUp={onKeyUp}
              value={editFormula}
            />
          </label>
        </div>
      )}
    </div>
  );
}
