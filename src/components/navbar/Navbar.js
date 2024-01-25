import React, { useState } from 'react';
import {Link, useLocation} from "react-router-dom";
import style from "./navbar.module.scss";
import logo from "../../assets/img/logo.png";
import home from "../../assets/img/icons/home.svg";
import temp from "../../assets/img/icons/thermometer.svg";
import ice from "../../assets/img/icons/artic.svg";
import ch4 from "../../assets/img/icons/ch4.svg";
import co2 from "../../assets/img/icons/co2.svg";
import no2 from "../../assets/img/icons/no2.svg";

function Navbar() {

  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  // funzione per verificare se un link è nella pagina corrente
  function isCurrentPage(path){
    return location.pathname === path;
  }
  // funzione per il burger
  function toggleBurger(){
    setIsActive(!isActive);
  }

  return (
    <nav className={style["navbar"]}>
      <div className={`${style["burger"]} ${isActive ? style["active"] : ""}`} onClick={toggleBurger}>
        <span className={style["bar"]}></span>
        <span className={style["bar"]}></span>
        <span className={style["bar"]}></span>
      </div>
      <div className={style["container"]}>
        <div>
          <img className="logo" src={logo} alt="logo"/>
        </div>
        <div>
          <h1 className={style["title"]}>Climate stats</h1>
        </div>
        <div className={style["ul-container"]}>
          <ul className={`${style["redirects"]} ${isActive ? style["active"] : ""}`}>
            {isCurrentPage("/") ? (
              <li><img className={style["icon"]} src={home} style={{boxShadow: "none"}}/></li>
            ) : (
              <li><Link to="/"><img className={style["icon"]} src={home}/></Link></li>
            )}
            {isCurrentPage("/temperature") ? (
              <li><img className={style["icon"]} src={temp} style={{boxShadow: "none"}}/></li>
            ): (
              <li><Link to="/temperature"><img className={style["icon"]} src={temp}/></Link></li>
            )}
            {isCurrentPage("/no2") ? (
              <li><img className={style["icon"]} src={no2} style={{boxShadow: "none"}}/></li>
            ): (
              <li><Link to="/no2"><img className={style["icon"]} src={no2}/></Link></li>
            )}
            {isCurrentPage("/ch4") ? (
              <li><img className={style["icon"]} src={ch4} style={{boxShadow: "none"}}/></li>
            ) : (
              <li><Link to="/ch4"><img className={style["icon"]} src={ch4}/></Link></li>
            )}
            {isCurrentPage("/co2") ? (
              <li><img className={style["icon"]} src={co2} style={{boxShadow: "none"}}/></li>
              ) : (
              <li><Link to="/co2"><img className={style["icon"]} src={co2}/></Link></li>
            )}
            {isCurrentPage("/arctic") ? (
              <li><img className={style["icon"]} src={ice} style={{boxShadow: "none"}}/></li>
            ) : (
              <li><Link to="/arctic"><img className={style["icon"]} src={ice}/></Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar