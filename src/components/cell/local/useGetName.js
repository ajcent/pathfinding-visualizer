import { useContext } from "react";
import { GridData } from "contexts/GridContext";

function useGetName() {
  const { solved, cell } = useContext(GridData);
  const { walls, visited, path, terminal, initial } = cell;

  const getClassName = (index) => {
    const names = ["cell"];
    if (walls[index] && index !== initial && index !== terminal)
      names.push("wall");
    if (visited[index])
      solved ? names.push("visited-instant") : names.push("visited");
    if (path[index]) solved ? names.push("path-instant") : names.push("path");
    if (index === initial) names.push("point");
    if (index === terminal) names.push("point");

    return names.join(" ");
  };

  return { getClassName };
}

export default useGetName;
