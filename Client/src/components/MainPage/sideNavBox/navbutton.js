import React from 'react';
import './navbutton.scss'
export default function MyButton(props) {
  return (
    <div className="contai">
        <input type="checkbox" id="cb1" /><label for="cb1">{props.message}</label>
    </div>
  );
}