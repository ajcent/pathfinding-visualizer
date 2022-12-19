import React, { useContext, useState } from "react";
import "./Grid.css";
import useToggle from "hooks/useToggle";
import { GridData } from "contexts/GridContext";
import useSetCell from "./local/useSetCell";
import Cell from "components/cell/Cell";

function Grid() {
  const [editable, toggleEditable] = useToggle(false);
  const { density, clickable, cell, setCell } = useContext(GridData);
  const { col, row, count } = density;
  const { mutateCell } = useSetCell();
  const { initial, terminal } = cell;
  const [action, setAction] = useState("wall");
  const [buffer, setBuffer] = useState(null);
  const grabbing = buffer || action !== "wall";

  const props = {
    editable,
    toggleEditable,
    action,
    setAction,
    buffer,
    setBuffer,
    grabbing,
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${col}, 1fr)`,
    gridTemplateRows: `repeat(${row}, 1fr)`,
  };
  const cursorStyle = grabbing ? { cursor: "grabbing" } : { cursor: "pointer" };
  const pointerStyle = !clickable
    ? { pointerEvents: "none", cursor: "not-allowed" }
    : {};

  const handleMouseDown = (e) => {
    const { target } = e;
    const index = parseInt(target.id);
    if (!target.matches(".cell")) return;

    e.preventDefault();
    if (editable) return;

    toggleEditable();
    if (index === initial) return setAction(() => "initial");
    if (index === terminal) return setAction(() => "terminal");
    setAction(() => "wall");
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    if (!editable) return;
    setAction(() => "wall");
    toggleEditable();
  };

  const handleMouseMove = (e) => {
    const { target } = e;
    const index = parseInt(target.id);
    if (!target.matches(".cell")) return;

    e.preventDefault();
    if (!editable) return;

    const modifiedCell = mutateCell(action, index);
    setCell((prev) => ({ ...prev, ...modifiedCell }));
  };

  const handleClick = (e) => {
    const { target } = e;
    const index = parseInt(target.id);
    if (!target.matches(".cell")) return;

    if (buffer) {
      const neoPos = mutateCell(buffer, index);
      setCell((prev) => ({ ...prev, ...neoPos }));
      return setBuffer(() => null);
    }

    if (index === initial) return setBuffer(() => "initial");
    if (index === terminal) return setBuffer(() => "terminal");

    const neoWall = mutateCell("wall", index);
    setCell((prev) => ({ ...prev, ...neoWall }));
  };

  return (
    <div
      id='grid'
      style={{ ...gridStyle, ...cursorStyle, ...pointerStyle }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={handleClick}>
      {Array.from(Array(count)).map((_, index) => (
        <Cell key={index} {...props} index={index} />
      ))}
    </div>
  );
}

export default Grid;
