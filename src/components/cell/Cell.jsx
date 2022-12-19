import React, { useContext } from "react";
import "./Cell.css";
import { GridData } from "contexts/GridContext";
import useGetName from "./local/useGetName";

function Cell(props) {
  const { index, grabbing } = props;
  const { cell } = useContext(GridData);
  const { initial, terminal } = cell;
  const { getClassName } = useGetName();

  const isGrabbing =
    !grabbing && (index === initial || index === terminal)
      ? { cursor: "grab" }
      : {};

  return (
    <span className={getClassName(index)} id={index} style={isGrabbing}>
      {index === initial && <span id='initial'></span>}
      {index === terminal && <span id='terminal'></span>}
    </span>
  );
}

export default Cell;
