// IMPORTS

import React from 'react';
import './styles/left.css';

// COMPONENTS

export function MenuItem(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.linkTo(e.target.title);
  };

  return (
    <li className="left-section__menu-container__list-item">
      <a
        className={
          props.isActive
            ? 'left-section__menu-container__list-item__content left-section__menu-container__list-item__content--active'
            : 'left-section__menu-container__list-item__content'
        }
        onClick={handleClick}
        href={props.href}
        title={props.value}
      >
        {props.value}
      </a>
    </li>
  );
}
