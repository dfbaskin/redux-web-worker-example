import React from "react";

interface Props {
  name: string;
}

export function Hello({ name }: Props) {
  return <div>Hello from {name}!</div>;
}
