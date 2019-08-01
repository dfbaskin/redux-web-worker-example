import React from "react";
import { ColumnDefinition } from "../../state-library/appState";
import { useStateSelector, WithSelector } from "../hooks/useStateSelector";

interface GridState {
  columns: ColumnDefinition[];
  data: any[][];
}

export function DataGrid() {
  const { columns, data } = useStateSelector(WithSelector.allDataSelector) || {
    columns: [],
    data: []
  };
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
