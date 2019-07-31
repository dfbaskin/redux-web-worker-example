import React from "react";
import "./Layout.scss";

interface Props {
  renderMenu: () => JSX.Element;
  renderHeader: () => JSX.Element;
  renderTable: () => JSX.Element;
}

export function Layout({ renderMenu, renderHeader, renderTable }: Props) {
  return (
    <div className="layout">
      {renderMenu()}
      {renderHeader()}
      {renderTable()}
    </div>
  );
}
