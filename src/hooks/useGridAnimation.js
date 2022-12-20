import { useContext, useEffect, useState } from "react";
import { GridData } from "contexts/GridContext";

function useGridAnimation() {
  const [timeOutHistory, setTimeOutHistory] = useState([]);
  const { setCell, toggleClickable, clickable, toggleSolved, solved } =
    useContext(GridData);

  // useEffect(() => {
  //   const clear = () => {
  //     timeOutHistory.forEach((id) => clearTimeout(id));
  //     setTimeOutHistory(() => []);
  //     !clickable && toggleClickable();
  //     solved && toggleSolved();
  //   };
  //   window.addEventListener("resize", clear);
  //   return () => window.removeEventListener("resize", clear);
  // }, [
  //   clickable,
  //   toggleClickable,
  //   setTimeOutHistory,
  //   solved,
  //   timeOutHistory,
  //   toggleSolved,
  // ]);

  const animateGrid = ({
    order,
    name,
    duration,
    gap,
    callback,
    delay = 0,
    activate = true,
  }) => {
    order.forEach((each, index) => {
      const id = setTimeout(() => {
        setCell((prev) => ({
          ...prev,
          [name]: prev[name].map((state, index) =>
            each === index ? true : state
          ),
        }));

        if (index === order.length - 1 && activate) {
          const id = setTimeout(() => {
            toggleClickable();
            callback && callback();
          }, duration);
          setTimeOutHistory((prev) => [...prev, id]);
        }
      }, delay + gap * index);
      setTimeOutHistory((prev) => [...prev, id]);
    });
  };

  return { animateGrid, timeOutHistory, setTimeOutHistory };
}

export default useGridAnimation;
