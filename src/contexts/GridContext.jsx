import React, { createContext } from "react";

export const GridData = createContext();
const { Provider } = GridData;

function GridContext({ value, children }) {
  return <Provider value={value}>{children}</Provider>;
}

export default GridContext;
