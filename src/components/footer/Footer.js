import React from 'react';
import style from "./footer.module.scss";
import logo from "../../assets/img/logo.png";
import instagram from "../../assets/img/icons/instagram.svg";
import facebook from "../../assets/img/icons/facebook.svg";
import twitter from "../../assets/img/icons/twitter.svg";
import youtube from "../../assets/img/icons/youtube.svg";

function Footer() {
  return (
    <footer className={style["footer"]}>
      <div className={style["info-container"]}>
        <img className="logo" src={logo} alt="logo"/>
        <p className={style["copyright"]}>&copy; 2023 Climate Stats</p>
        <a className={style["about"]} href="/">About</a>
      </div>
      <div className={style["icons-container"]}>
        <a href="/"><img className={style["icon"]} src={instagram} alt="instagram icon"/></a>
        <a href="/"><img className={style["icon"]} src={facebook} alt="facebook icon"/></a>
        <a href="/"><img className={style["icon"]} src={twitter} alt="twitter icon"/></a>
        <a href="/"><img className={style["icon"]} src={youtube} alt="youtube icon"/></a>
    </div>
  </footer>
  )
}

export default Footer