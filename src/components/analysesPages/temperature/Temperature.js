import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import Chart from "chart.js/auto";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import style from "./temperature.module.scss";
import errorIcon from "../../../assets/img/icons/error-icon.png";

function Temperature() {

  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect( () => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // fetch dei dati e creazione grafico
  useEffect( () => {
    async function getTemperature(){
      try{
        setIsLoading(true);

        const response = await axios.get("https://global-warming.org/api/temperature-api");
        const data = await response.data.result;
        const time = data.map( item => item.time);
        const station = data.map( item => parseFloat(item.station));
        const land = data.map( item => parseFloat(item.land));

        // specifiche del grafico
        const graph = {
          type: "bar",
          data: {
            labels: time,
            datasets: [
              {
                label: "Temperature Anomalies",
                data: station,
                borderColor: "rgb(35, 90, 146)",
                backgroundColor: "rgba(35, 90, 146, 0.5)",
                borderWidth: 2,
                fill: false
              },
              {
                label: "Land Anomalies",
                data: land,
                borderColor: "rgb(116, 82, 20)",
                backgroundColor: "rgba(116, 82, 20, 0.5)",
                borderWidth: 2,
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: "category",
                position: "bottom",
                title:{
                  display: true,
                  text: "Years",
                  color: "#ffffff",
                  font: {
                    size: 20,
                    family: "Latina",
                    weight: "bold"
                  }
                },
                ticks: {
                  color: "#000000",
                  font: {
                    size: 16,
                    family: "Metropolis"
                  }
                },
                grid: {
                  color: "#000000"
                }
                },
              y: {
                type: "linear",
                position: "left",
                title: {
                  display: true,
                  text: "Temperature Anomalies",
                  color: "#ffffff",
                  font: {
                    size: 20,
                    family: "Latina",
                    weight: "bold"
                  }
                },
                ticks: {
                  color: "#000000",
                  font: {
                    size: 16,
                    family: "Metropolis"
                  }
                },
                grid: {
                  color: "#000000"
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  color: "#ffffff",
                  font: {
                    size: 25,
                    family: "Latina"
                  }
                }
              }
            }
          }
        };
        console.log("Anomalie Temperature: ", station);
        console.log("Anomalie lands: ", land);
        const ctx = chartRef.current.getContext("2d");
        const newChartInstance = new Chart(ctx, graph);

        setIsLoading(false);
        console.log("Temperatures: ", data);

      } catch(error){
        console.log("Ops, there has been an error: ", error);
        setIsLoading(false);
        setError(error);
      }
    }

    if(isMounted){
      getTemperature();
    }
  }, [isMounted]);

  return (
    <div className={style["page"]}>
      <Navbar/>
      {isLoading && (
        <div className='loader-container'>
          ...Loading...
          <div className='azure-loader'></div>
          <div className='brown-loader'></div>
          <div className='green-loader'></div>
          <div className='orange-loader'></div>
        </div>
      )}
      <h1 className={style["page-title"]}>
        Welcome to the page displaying the temperatures over the years, highlighting seasonal variations and enabling observation of changes over time.
      </h1>
      <canvas ref={chartRef} className={style["canvas"]}></canvas>
      <div className={style["analyses-container"]}>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Factors contributing to the rise in temperatures</h2>
          <p className={style["analyses"]}>
            The increase in global temperatures is primarily attributed to human activity and human-induced climate change. Some of the main causes include greenhouse gas emissions, deforestation, intensive agriculture, solid waste, industrial activities, and excessive urbanization.<br/>
            While human influence is the primary cause of rising temperatures, there are also natural variations in climate, such as volcanic eruptions, which can temporarily influence the climate.<br/>
            It is important to emphasize that the scientific community widely agrees that human activities are the main cause of the observed increase in global temperatures in recent decades.
          </p>
        </div>
        <div className={style["section"]}>
          <ul className={style["list"]}>Strategies for Mitigations
            <li className={style["li-element"]}>
              To mitigate the increase in global temperatures and address climate change, coordinated global efforts are needed to improve energy efficiency in various commercial, industrial, and agricultural sectors and transition to clean and renewable energy sources.
            </li>
            <li className={style["li-element"]}>
              Reforestation should be planned, and existing forests preserved to capture atmospheric carbon and maintain ecological balance.
            </li>
            <li className={style["li-element"]}>
              As always, keeping the population informed and educated about the importance of sustainability can lead to increased engagement in the fight against climate change.
            </li>
          </ul>
          <p className={style["analyses"]}>
            These remedies need to be implemented urgently and collaboratively to effectively address the rise in global temperatures and reduce the impact of climate change on our biosphere.
          </p>
        </div>
          <h2 className={style["subheading"]}>Future Predictions</h2>
          <p className={style["analyses"]}>
            Climate scientists use complex climate models to make estimates based on different scenarios of greenhouse gas emissions. It is predicted that average global temperatures will continue to rise throughout the 21st century. There will be an increase in the frequency and intensity of extreme weather events such as heatwaves, storms, floods, and droughts due to climate change. The effects of rising temperatures are reflected in the rapid melting of glaciers and icebergs, contributing to sea level rise. Changes in precipitation patterns are expected, with some regions experiencing increased rainfall and others facing greater aridity.<br/>
            The warming temperatures will have significant impacts on ecosystems, posing risks to biodiversity both on land and in aquatic environments, with the potential for species extinctions.<br/>
            It is important to emphasize that climate predictions are subject to uncertainties and variations, but the scientific community agrees that human action to reduce greenhouse gas emissions can contribute to mitigating the future impacts of climate change.
          </p>
      </div>
      <h2 className={style["data-source"]}>
        The data source is the <a href="https://www.nasa.gov/goddard/" rel="noreferrer" className={style["source-data-link"]}>Goddard Space Flight Center</a>, which has collected and provided data on polar ice extent from the year 1880 to 2023.
      </h2>
      {error && (
        <div className='error-message'>
          <img src={errorIcon} className='error-icon' alt="Error Icon"/>
          Ops, There has been an error: <br/> {error.message}
        </div>
      )}
      <Footer/>
    </div>
  )
}

export default Temperature