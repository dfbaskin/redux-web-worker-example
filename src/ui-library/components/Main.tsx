import React from "react";
import { Layout } from "./Layout";
import { DataGrid } from "./DataGrid";
import { Header } from "./Header";

interface Props {
  title: string;
}

export function Main({ title }: Props) {
  return (
    <Layout
      renderMenu={() => <Header title={title} />}
      renderHeader={() => <div>...</div>}
      renderTable={() => <DataGrid />}
    />
  );
}
