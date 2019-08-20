import React, { useContext, useEffect } from "react";
import { Layout } from "./Layout";
import { DataGrid } from "./DataGrid";
import { Header } from "./Header";
import { DataGridMenu } from "./DataGridMenu";
import { AppStoreContext } from "../../state-library/AppStoreContext";
import { DataSizes, resetExampleDataAction } from "../../state-library/actions";

interface Props {
  title: string;
}

export function Main({ title }: Props) {
  const { dispatch } = useContext(AppStoreContext);
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        resetExampleDataAction({
          size: DataSizes.Small
        })
      );
    });
  }, []);
  return (
    <Layout
      renderMenu={() => <Header title={title} />}
      renderHeader={() => <DataGridMenu />}
      renderTable={() => <DataGrid />}
    />
  );
}
