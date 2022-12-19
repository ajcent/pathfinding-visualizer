import React from "react";
import "./Legend.css";

function Legend() {
  return (
    <>
      <li className='navbar-list'>
        <span className='navbar-legend'>
          <span className='navbar-legend-start'>Start</span>
          <span className='icon start-icon'></span>
        </span>
      </li>
      <li className='navbar-list'>
        <span className='navbar-legend'>
          <span className='navbar-legend-goal'>Goal</span>
          <span className='icon goal-icon'></span>
        </span>
      </li>
      <li className='navbar-list'>
        <span className='navbar-legend'>
          <span className='navbar-legend-wall'>Wall</span>
          <span className='icon wall-icon'></span>
        </span>
      </li>
      <li className='navbar-list'>
        <span className='navbar-legend'>
          <span className='navbar-legend-visited'>Visited</span>
          <span className='icon visited-icon'></span>
        </span>
      </li>
      <li className='navbar-list'>
        <span className='navbar-legend'>
          <span className='navbar-legend-path'>Path</span>
          <span className='icon path-icon'></span>
        </span>
      </li>
    </>
  );
}

export default Legend;
