import { useEffect, useState } from "react";
import { Cell } from "classes/index";

function useGetCell(density) {
  const [cell, setCell] = useState(new Cell(density));

  useEffect(() => {
    setCell(new Cell(density));
  }, [density]);

  return { cell, setCell };
}

export default useGetCell;
