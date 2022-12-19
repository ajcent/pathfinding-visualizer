import React, { useContext, useState } from "react";
import "./Navbar.css";
import { GridData } from "contexts/GridContext";

import Dropdown from "components/dropdown/Dropdown";
import HopLetter from "components/hopLetter/HopLetter";
import NavButton from "components/navButton/NavButton";
import Legend from "components/legend/Legend";

import useToggle from "hooks/useToggle";
import useNavbar from "./local/useNavbar";

function Navbar() {
  const [speed, setSpeed] = useState(1);
  const { setAlgorithm, algorithm, cell } = useContext(GridData);
  const { solved, clickable } = useContext(GridData);
  const { terminal, initial, walls, visited, path } = cell;
  const [mobileNav, toggleMobileNav] = useToggle(true);
  const { stop, reset, getMaze, getPath } = useNavbar(speed);

  const handleClick = (e, callback) => {
    const name = e.target.name;
    if (name === "navbar-mobile") return callback();
    toggleMobileNav();

    if (name === "") return callback();
    callback(name);
  };

  return (
    <nav className='navbar'>
      <NavButton
        className='navbar-button mobile-button highlight'
        name='navbar-mobile'
        onClick={(e) => handleClick(e, toggleMobileNav)}>
        <HopLetter text='Pathfinder' />
      </NavButton>
      <ul
        className={`navbar-main${clickable ? "" : " inactive"}${
          mobileNav ? " hide-mobile" : ""
        }`}>
        <li className='navbar-list'>
          <span className='navbar-title'>Pathfinding Visualizer</span>
        </li>
        <li className='navbar-list'>
          <NavButton
            className='navbar-button'
            onClick={(e) => handleClick(e, getMaze)}>
            <HopLetter text='Maze' />
          </NavButton>
        </li>
        <li className='navbar-list'>
          <Dropdown title='Clear' className={solved ? "keep" : ""}>
            <NavButton onClick={reset}>All</NavButton>
            <NavButton
              onClick={() => reset({ initial, terminal, visited, path })}>
              Wall
            </NavButton>
            <NavButton onClick={() => reset({ initial, terminal, walls })}>
              Path
            </NavButton>
          </Dropdown>
        </li>

        <li className='navbar-list'>
          <Dropdown title='Speed'>
            <NavButton
              onClick={() => setSpeed(2)}
              className={speed === 2 ? "active" : ""}>
              Slow
            </NavButton>
            <NavButton
              onClick={() => setSpeed(1)}
              className={speed === 1 ? "active" : ""}>
              Default
            </NavButton>
            <NavButton
              onClick={() => setSpeed(0.5)}
              className={speed === 0.5 ? "active" : ""}>
              Fast
            </NavButton>
          </Dropdown>
        </li>

        <li className='navbar-list'>
          <Dropdown title='Algorithm'>
            <NavButton
              onClick={() => setAlgorithm("A*")}
              className={"A*" === algorithm ? "active" : ""}>
              A*
            </NavButton>
            <NavButton
              onClick={() => setAlgorithm("Depth-First")}
              className={"Depth-First" === algorithm ? "active" : ""}>
              Depth-First
            </NavButton>
            <NavButton
              onClick={() => setAlgorithm("Breadth-First")}
              className={"Breadth-First" === algorithm ? "active" : ""}>
              Breadth-First
            </NavButton>
            <NavButton
              onClick={() => setAlgorithm("Best-First")}
              className={"Best-First" === algorithm ? "active" : ""}>
              Best-First
            </NavButton>
          </Dropdown>
        </li>
        <li className='navbar-list'>
          <NavButton
            className='navbar-button highlight'
            all={[!solved]}
            onClick={(e) => handleClick(e, getPath)}>
            {solved ? <HopLetter text='Done' /> : <HopLetter text='Search' />}
          </NavButton>
        </li>
        <li>
          <NavButton
            className='mobile-button back'
            name='navbar-mobile'
            onClick={(e) => handleClick(e, toggleMobileNav)}>
            Back
          </NavButton>
        </li>
      </ul>

      {!clickable && (
        <ul className='navbar-sub'>
          <Legend />
          <li className='navbar-list'>
            <NavButton
              className={`navbar-button highlight${
                mobileNav ? " hide-mobile" : ""
              }`}
              any={[true]}
              onClick={(e) => handleClick(e, stop)}>
              <HopLetter text='Stop' />
            </NavButton>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
