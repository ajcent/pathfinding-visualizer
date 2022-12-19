import React from "react";
import "./HopLetter.css";

function HopLetter({ text }) {
  const letters = text.split("");

  return (
    <span className='hop-wrapper'>
      {letters.map((letter, index) => (
        <span className='hop-letter' key={index} style={{ "--delay": index }}>
          {letter}
        </span>
      ))}
    </span>
  );
}

export default HopLetter;
