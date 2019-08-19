import React, { useContext, useEffect } from "react";
import { AppStoreContext } from "../../state-library/AppStoreContext";
import { resetDataToSizeAction } from "../../state-library/actions";
import { DataSizes } from "../../state-library/actions/resetData";

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
  useEffect(() => {
    setTimeout(() => {
      dispatch(resetDataToSizeAction(DataSizes.Small));
    });
  }, []);
  return (
    <div className="app-header">
      <div>{title}</div>
      <div>
        {sizes.map(([name, size]) => (
          <button
            type="button"
            onClick={() => dispatch(resetDataToSizeAction(size))}
            key={size}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
