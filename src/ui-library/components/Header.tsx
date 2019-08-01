import React, { useContext } from "react";
import { AppStoreContext } from "../../state-library/AppStoreContext";
import { resetDataAction } from "../../state-library/actions";

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  const { dispatch } = useContext(AppStoreContext);
  const onClick = () => {
    dispatch(resetDataAction({ rows: 50, cols: 30 }));
  };
  return (
    <div>
      <span>{title}</span>
      <button type="button" onClick={onClick}>
        Reset Grid
      </button>
    </div>
  );
}
