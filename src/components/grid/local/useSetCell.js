import { useContext } from "react";
import useClass from "hooks/useClass";
import { GridData } from "contexts/GridContext";

function useSetCell() {
  const { cell, solved } = useContext(GridData);
  const { initial, terminal } = cell;
  const { pathfinder } = useClass();

  const setEndpoint = (action, pos) => {
    if (solved) {
      const data = { ...cell, [action]: pos };
      const { path, visited } = pathfinder(data);
      return { path, visited, [action]: pos };
    }

    return {
      visited: cell.visited.map(() => false),
      path: cell.path.map(() => false),
      [action]: pos,
    };
  };

  const mutateCell = (action, pos) => {
    switch (action) {
      case "initial":
        return terminal !== pos && setEndpoint(action, pos);
      case "terminal":
        return initial !== pos && setEndpoint(action, pos);
      default:
        return {
          walls: cell.walls.map((wall, index) =>
            index === pos ? !wall : wall
          ),
        };
    }
  };

  return { mutateCell };
}

export default useSetCell;
