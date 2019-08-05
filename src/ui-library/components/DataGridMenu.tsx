import React, { useContext } from "react";
import { AppStoreContext } from "../../state-library/AppStoreContext";
import { addRandomDataColumnAction } from "../../state-library/actions";

import "./DataGridMenu.scss";

export function DataGridMenu() {
  const { dispatch } = useContext(AppStoreContext);
  return (
    <div className="grid-menu">
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
  );
}
