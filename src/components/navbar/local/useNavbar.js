import { useContext } from "react";
import { GridData } from "contexts/GridContext";
import useClass from "hooks/useClass";
import useGridAnimation from "hooks/useGridAnimation";
import { Cell } from "classes/index";

function useNavbar(speed) {
  const { setCell, cell, toggleSolved } = useContext(GridData);
  const { density, solved, clickable, toggleClickable } = useContext(GridData);
  const { terminal, initial, walls } = cell;
  const { animateGrid, timeOutHistory, setTimeOutHistory } = useGridAnimation();
  const { pathfinder, maze } = useClass();

  const stop = () => {
    timeOutHistory.forEach((id) => clearTimeout(id));
    setTimeOutHistory(() => []);
    !clickable && toggleClickable();
  };

  const reset = (preserve = {}) => {
    if (!clickable) return;
    solved && toggleSolved();
    setCell(() => ({ ...new Cell(density), ...preserve }));
  };

  const getMaze = () => {
    if (!clickable) return;
    reset({ terminal, initial });
    toggleClickable();
    const { walls } = maze(cell);

    animateGrid({
      order: walls
        .map((wall, index) => (wall ? index : -1))
        .filter((index) => index !== -1),
      name: "walls",
      duration: 350,
      gap: 40 * speed,
    });
  };

  const getPath = () => {
    if (!clickable || solved) return;
    if (initial === -1 && terminal === -1) return;

    const { visitOrder, pathOrder } = pathfinder(cell);
    reset({ terminal, initial, walls });
    toggleClickable();

    animateGrid({
      order: visitOrder,
      name: "visited",
      duration: 500,
      gap: 100 * speed,
      activate: false,
    });

    animateGrid({
      order: pathOrder,
      name: "path",
      duration: 300,
      gap: 80 * speed,
      delay: visitOrder.length * 100 * speed,
      callback: !solved ? toggleSolved : null,
    });
  };

  return { stop, reset, getMaze, getPath };
}

export default useNavbar;
