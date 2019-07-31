import React from "react";
import { ColumnDefinition } from "../../state-library/appState";

interface Props {
  columns: ColumnDefinition[];
  data: any[][];
}

export function DataGrid({ columns, data }: Props) {
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
