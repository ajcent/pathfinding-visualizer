import React, { useContext } from "react";
import "./NavButton.css";
import { GridData } from "contexts/GridContext";

function NavButton(props) {
  const { clickable } = useContext(GridData);
  const { name, children, onClick } = props;
  const { all = [true], any = [false], className = "" } = props;

  const priority = all.every((each) => each);
  const always = any.some((each) => each);
  const state = clickable & priority || always ? "" : "unclickable";
  const classNames = [className, state];

  return (
    <button
      name={name}
      type='button'
      className={
        classNames.join(" ") === " " ? null : classNames.join(" ").trim()
      }
      onClick={onClick}>
      {children}
    </button>
  );
}

export default NavButton;
