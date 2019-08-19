import React from "react";

interface Props {
  top: number;
  left: number;
  width: number;
  height: number;
  value: any;
}

export function GridWorksheetDataCell({
  top,
  left,
  width,
  height,
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
      className="cell"
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
