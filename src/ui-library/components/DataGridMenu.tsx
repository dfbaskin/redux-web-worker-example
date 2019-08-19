import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { AppStoreContext } from "../../state-library/AppStoreContext";
import { addRandomDataColumnAction } from "../../state-library/actions";
import { useStateSelector, WithSelector } from "../hooks/useStateSelector";

import "./DataGridMenu.scss";

export function DataGridMenu() {
  const { columnId, formula } = useStateSelector(
    WithSelector.currentFormulaSelector
  ) || {
    columnId: "",
    formula: ""
  };
  const { dispatch } = useContext(AppStoreContext);
  const [editFormula, setEditFormula] = useState(formula);
  useEffect(() => {
    setEditFormula(formula);
  }, [columnId, formula]);
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEditFormula(evt.target.value);
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
            <input type="text" onChange={onChange} value={editFormula} />
          </label>
        </div>
      )}
    </div>
  );
}
