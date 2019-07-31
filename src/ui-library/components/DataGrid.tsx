import React, { useContext, useState, useEffect } from "react";
import { ColumnDefinition } from "../../state-library/appState";
import { AppStoreContext } from "../../state-library/AppStoreContext";

interface GridState {
  columns: ColumnDefinition[];
  data: any[][];
}

export function DataGrid() {
  const [{ columns, data }, setGridState] = useState<GridState>({
    columns: [],
    data: []
  });
  const { selectors, subscribe } = useContext(AppStoreContext);
  useEffect(() => {
    const { unsubscribe } = subscribe(selectors.allDataSelector, setGridState);
    return unsubscribe;
  }, [selectors, subscribe, setGridState]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ id, width }) => (
              <th style={{ width }} key={id}>
                {id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataRow, idx) => (
            <tr key={idx}>
              {dataRow.map((item, idx) => (
                <td key={idx}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
