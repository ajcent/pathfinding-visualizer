import { useCallback, useLayoutEffect, useState } from "react";

const normalizedValue = (value, size) => {
  const count = Math.trunc(value / size);
  return count % 2 !== 0 ? count : count + 1;
};

const getDensity = (width, height, size) => {
  const row = normalizedValue(height, size);
  const col = normalizedValue(width, size);
  return { count: col * row, col: col, row: row };
};

const getDimension = ({ scaleX, scaleY }) => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width: width * scaleX, height: height * scaleY };
};

export default function useCreateGrid(settings) {
  const { width, height } = getDimension(settings);
  const { size } = settings;

  const [grid, setGrid] = useState({
    dimension: { width: width, height: height },
    density: getDensity(width, height, size),
  });

  const handleResize = useCallback(() => {
    const { width, height } = getDimension(settings);
    setGrid(() => ({
      dimension: { width: width, height: height },
      density: getDensity(width, height, size),
    }));
  }, [settings, size]);

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return { ...grid };
}
