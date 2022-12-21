import { useCallback, useEffect, useState } from "react";

const normalizedValue = (value, size) => {
  const count = Math.trunc(value / size);
  return count % 2 !== 0 ? count : count + 1;
};

const getDensity = (width, height, size) => {
  const row = normalizedValue(height, size);
  const col = normalizedValue(width, size);

  const widthDiff = width / col,
    heightDiff = height / row;

  let increaseX = heightDiff - widthDiff >= 1.15 ? 2 : 0;
  let increaseY = widthDiff - heightDiff >= 1.15 ? 2 : 0;

  return { count: col * row, col: col + increaseX, row: row + increaseY };
};

const getDimension = ({ scaleX, scaleY }) => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width: width * scaleX, height: height * scaleY };
};

export default function useGetGrid(settings) {
  const { width, height } = getDimension(settings);
  const { size } = settings;

  const [grid, setGrid] = useState({
    dimension: { width: width, height: height },
    density: getDensity(width, height, size),
  });

  // const handleResize = useCallback(() => {
  //   const { width, height } = getDimension(settings);
  //   setGrid(() => ({
  //     dimension: { width: width, height: height },
  //     density: getDensity(width, height, size),
  //   }));
  // }, [settings, size]);

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [handleResize]);

  return { ...grid };
}
