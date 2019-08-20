import React, { useEffect, useState } from "react";
import { json } from "mathjs";

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
  const [displayValue, setDisplayValue] = useState<any>(null);
  useEffect(() => {
    if (value === null || value === undefined) {
      setDisplayValue(null);
    } else if (typeof value === "object") {
      if (value.type === "mathjs") {
        const mathValue = JSON.parse(value.serialized, json.reviver);
        setDisplayValue(mathValue.toString());
      } else {
        setDisplayValue(JSON.stringify(value));
      }
    } else {
      setDisplayValue(value);
    }
  }, [value]);
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
