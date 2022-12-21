import React, { useState } from "react";
import "./Pathfinder.css";

import useGetGrid from "./local/useGetGrid";
import useGetCell from "./local/useGetCell";
import useToggle from "hooks/useToggle";

import GridContext from "contexts/GridContext";
import Grid from "components/grid/Grid";
import Navbar from "components/navbar/Navbar";
import Guide from "components/guide/Guide";

const WINDOW_DIMENSION = {
  size: 26,
  scaleX: 1,
  scaleY: 0.9,
};

function Pathfinder() {
  const [clickable, toggleClickable] = useToggle(true);
  const [solved, toggleSolved] = useToggle(false);
  const { dimension, density } = useGetGrid(WINDOW_DIMENSION);
  const { cell, setCell } = useGetCell(density);
  const [algorithm, setAlgorithm] = useState("A*");

  const value = {
    clickable,
    toggleClickable,
    solved,
    toggleSolved,
    dimension,
    density,
    cell,
    setCell: (object, priority = false) =>
      (clickable || priority) && setCell(object),
    algorithm,
    setAlgorithm,
  };

  return (
    <div id='pathfinder'>
      <GridContext value={value}>
        <Guide />
        <Navbar />
        <Grid />
      </GridContext>
    </div>
  );
}

export default Pathfinder;
