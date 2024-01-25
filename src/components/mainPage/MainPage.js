import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import Navbar from "../navbar/Navbar";
import Card from "../card/Card";
import Footer from "../footer/Footer";
import style from "./mainPage.module.scss";
import thermometerImg from "../../assets/img/temp-card.png";
import arcticImg from "../../assets/img/arctic-card.avif";
import ch4Img from "../../assets/img/ch4-card.png";
import co2Img from "../../assets/img/co2-card.png";
import no2Img from "../../assets/img/no2.jpeg";

function MainPage() {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        {/* Description */}
        {/* Search Engine */}
        <meta name="description" content="Learn the latest data on global warming, its causes, and the worldwide impacts. Reliable and up-to-date information to better understand the climate crisis."/>
        {/* Open Graph for social media */}
        <meta name="og:title" property="og:title" content="Data on Global Warming - Understanding the Climate Crisis"/>
        <meta property="og:description" content="Discover the latest statistics, trends, and analyses on global warming. Contribute to awareness and the fight against the climate crisis with science-based information."/>
        <meta property="og:url" content="https://so-ca.github.io./"/>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico"/>
        <title>Climate Stats</title>
      </Helmet>
    

      <div className={style["main-page"]}>
        <Navbar/>
        <section className={style["section"]}>
          <h1 className={style["title"]}>Global Warming Insight Hub</h1>
          <h2 className={style["subheading"]}>Keep up to date on the trends in the effects of climate change: Detailed Graphs and Visual Analysis to Understand Environmental Impact.</h2>
          <div className={style["cards-container"]}>
            <Card 
              caption="Analysis of the global climate crisis with informative graph data and scientific insights to understand the impact of greenhouse gas emissions on Earth" 
              image={thermometerImg} 
              linkTo="/temperature"
              style={{objectPosition: "10% 0%"}}
            />
            <Card 
              caption="Identify the primary sources of nitrogen dioxide, their impacts on air quality, and human health." 
              image={no2Img}
              linkTo="/no2"
            />
              <Card 
                caption="Data on primary sources, environmental impacts, and the key role of this greenhouse gas in climate change." 
                image={ch4Img} 
                linkTo="/ch4"
              />
            <Card 
              caption="Deepen your understanding of carbon dioxide sources, their impact on climate change, and solutions to reduce emissions." 
              image={co2Img}
              linkTo="/co2"
            />
            <Card 
              caption="Dive in-depth understanding of global impacts through scientific data and visualizations, raising awareness of the current fragility of polar ecosystems and global water resources."
              image={arcticImg} 
              linkTo="/arctic"
              style={{objectPosition: "70% 0%"}}
            />
          </div>
        </section>
        <Footer/>
      </div>
    </>
  )
}

export default MainPage