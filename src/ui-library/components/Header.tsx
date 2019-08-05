import React, { useContext, useEffect } from "react";
import { AppStoreContext } from "../../state-library/AppStoreContext";
import { resetDataAction } from "../../state-library/actions";

import "./Header.scss";

const sizes = [
  { name: "Small", rows: 50, cols: 50 },
  { name: "Medium", rows: 1000, cols: 700 },
  { name: "Large", rows: 10000, cols: 4000 }
];

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  const { dispatch } = useContext(AppStoreContext);
  useEffect(() => {
    setTimeout(() => {
      dispatch(resetDataAction({ rows: 50, cols: 30 }));
    });
  }, []);
  return (
    <div className="app-header">
      <div>{title}</div>
      <div>
        {sizes.map(({ name, rows, cols }) => (
          <button
            type="button"
            onClick={() => dispatch(resetDataAction({ rows, cols }))}
            key={name}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
