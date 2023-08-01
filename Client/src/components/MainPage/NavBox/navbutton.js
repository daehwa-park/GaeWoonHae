import React from 'react';
import './navbutton.scss';

export default function MyButton({ message, onClick }) {
  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) {
        onClick();

    }
  };

  return (
    <div className="contai" onClick={handleClick}>
      <input type="checkbox" id="cb1" />
      <label htmlFor="cb1">{message}</label>
    </div>
  );
}