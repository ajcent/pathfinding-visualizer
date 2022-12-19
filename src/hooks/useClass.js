import { useCallback, useContext } from "react";
import { GridData } from "contexts/GridContext";
import { Astar, BFS, DFS, Greedy, Maze } from "classes/index";

function useClass() {
  const { density, algorithm } = useContext(GridData);

  const getPathfinder = useCallback(
    (data) => {
      switch (algorithm) {
        case "Breadth-First":
          return new BFS(density, data);
        case "Depth-First":
          return new DFS(density, data);
        case "A*":
          return new Astar(density, data);
        case "Best-First":
          return new Greedy(density, data);
        default:
          return new Astar(density, data);
      }
    },
    [algorithm, density]
  );

  const pathfinder = useCallback(
    (data) => {
      const pf = getPathfinder(data);
      pf.generate();
      pf.constructPath();
      return { ...pf };
    },
    [getPathfinder]
  );

  const maze = useCallback(
    (data) => {
      const mz = new Maze(density, data);
      mz.generate();
      return mz;
    },
    [density]
  );

  return { pathfinder, maze };
}

export default useClass;
