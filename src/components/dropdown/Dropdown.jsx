import React, { useEffect, useRef } from "react";
import "./Dropdown.css";
import useToggle from "hooks/useToggle";
import HopLetter from "components/hopLetter/HopLetter";

function Dropdown({ title, children, className = "" }) {
  const [visibility, toggleVisibility] = useToggle(false);
  const componentRef = useRef(null);
  const classNames = ["dropdown", className];

  useEffect(() => {
    const hide = (e) => {
      if (componentRef.current === e.target) return;
      if (!visibility) return;
      toggleVisibility();
    };
    window.addEventListener("click", hide);
    return () => window.removeEventListener("click", hide);
  }, [toggleVisibility, visibility]);

  useEffect(() => {
    const navigate = (e) => {
      if (e.target === componentRef.current && e.key === "Enter") {
        toggleVisibility();
      }
    };
    window.addEventListener("keydown", navigate);
    return () => window.removeEventListener("keydown", navigate);
  }, [toggleVisibility]);

  return (
    <div
      className={classNames.join(" ").trim()}
      onClick={toggleVisibility}
      ref={componentRef}
      tabIndex={0}>
      <span className='dropdown-title'>
        <HopLetter text={title} />
      </span>
      {visibility && <span className='dropdown-content'>{children}</span>}
    </div>
  );
}

export default Dropdown;
