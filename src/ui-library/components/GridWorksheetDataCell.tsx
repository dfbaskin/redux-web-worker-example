import React from "react";

interface Props {
  top: number;
  left: number;
  width: number;
  height: number;
  isColumnSelected: boolean;
  value: any;
}

export function GridWorksheetDataCell({
  top,
  left,
  width,
  height,
  isColumnSelected,
  value
}: Props) {
  const displayValue =
    value === null || value === undefined
      ? null
      : typeof value === "object"
      ? value.toString()
      : value;
  return (
    <div
      className={isColumnSelected ? "cell selected" : "cell"}
      style={{
        top,
        left,
        width,
        height
      }}
    >
      {displayValue}
    </div>
  );
}
