import React, { useContext } from "react";
import { AppStoreContext } from "../../state-library/AppStoreContext";
import { DataSizes, resetExampleDataAction } from "../../state-library/actions";

import "./Header.scss";

const sizes: [string, DataSizes][] = [
  ["Small", DataSizes.Small],
  ["Medium", DataSizes.Medium],
  ["Large", DataSizes.Large]
];

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  const { dispatch } = useContext(AppStoreContext);
  return (
    <div className="app-header">
      <div>{title}</div>
      <div>
        {sizes.map(([name, size]) => (
          <button
            type="button"
            onClick={() =>
              dispatch(
                resetExampleDataAction({
                  size
                })
              )
            }
            key={size}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
