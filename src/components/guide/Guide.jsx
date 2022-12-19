import React from "react";
import "./Guide.css";
import NavButton from "components/navButton/NavButton";
import useToggle from "hooks/useToggle";

function Guide() {
  const [visibility, toggleVisibility] = useToggle(true);

  return (
    <div id='guide' style={visibility ? null : { display: "none" }}>
      <ul id='guide-wrapper'>
        <li>
          <h5>Greetings!</h5>
          <p>
            The name is Lloyd. Here's a quick guide to familiarize yourself.
            Have fun!
          </p>
        </li>

        <li>
          <h6 className='guide-keyword'>Set up or take off a wall</h6>
          <p className='guide-definition'>
            <span className='guide-bullet'>A.</span> Click a cell to initiate or
            delete one <span className='guide-icon icon wall-icon'></span> wall.
          </p>
          <p className='guide-definition'>
            <span className='guide-bullet'>B.</span> Left Click + Hold + Swipe
            mouse on cells to create or remove multiple{" "}
            <span className='guide-icon icon wall-icon'></span> walls.
          </p>
        </li>

        <li>
          <h6 className='guide-keyword'>
            Repositioning the start or goal point
          </h6>
          <p className='guide-definition'>
            <span className='guide-bullet'>A.</span> Click the{" "}
            <span className='guide-icon icon start-icon'></span> start or the{" "}
            <span className='guide-icon icon goal-icon'></span> goal, then click
            a different cell to change their position.
          </p>
          <p className='guide-definition'>
            <span className='guide-bullet'>B.</span> Left Click + Hold + Drag
            the <span className='guide-icon icon start-icon'></span> start or
            the <span className='guide-icon icon goal-icon'></span> goal to a
            different cell to change their position.
          </p>
        </li>

        <li>
          <h6 className='guide-keyword'>Instant recomputation of path</h6>
          <p className='guide-definition'>
            <span className='guide-bullet'>A.</span> Left click + Drag the{" "}
            <span className='guide-icon icon start-icon'></span> start or the{" "}
            <span className='guide-icon icon goal-icon'></span> goal for an
            immediate new <span className='guide-icon icon path-icon'></span>{" "}
            path calculation when the pathfinder is done calculating.
          </p>
        </li>

        <li>
          <NavButton className='guide-button' onClick={toggleVisibility}>
            Get started
          </NavButton>
        </li>
      </ul>
    </div>
  );
}

export default Guide;
