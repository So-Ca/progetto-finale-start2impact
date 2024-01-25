import React from 'react';
import {Link} from "react-router-dom";
import style from "./card.module.scss";

function Card(props) {
  return (
    <Link to={props.linkTo} className={style["card"]}>
      <img className={style["wallpaper"]} src={props.image} style={props.style} alt="card"/>
      <p className={style["caption"]}>{props.caption}</p>
    </Link>
  )
}

export default Card