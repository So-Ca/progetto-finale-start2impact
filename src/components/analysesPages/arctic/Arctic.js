import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import Chart from "chart.js/auto";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import style from "./arctic.module.scss";
import errorIcon from "../../../assets/img/icons/error-icon.png";

function Arctic() {

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
    async function getArctic(){
      try{
        setIsLoading(true);
  
        const response = await axios.get("https://global-warming.org/api/arctic-api");
        const data = await response.data.arcticData;
        const years = data.map( item => item.year);
        const extents = data.map( item => item.extent);
  
        // specifiche del grafico
        const graph = {
          type: "line",
          data: {
            labels: years,
            datasets: [
              {
                label: "Arctic Polar Ice Extent",
                data: extents,
                borderColor: "#235A92",
                borderWidth: 2,
                fill: true
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
                  color: "#745214",
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
                  color: "#745214"
                } 
                },
              y: {
                type: "linear",
                position: "left",
                title: {
                  display: true,
                  text: "Extent (M km²)",
                  color: "#745214",
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
                  color: "#745214"
                }
              }
            },
            plugins: {
              legend: {
                display: true, 
                position: "top",
                labels: {
                  color: "#235A92",
                  font: {
                    size: 25,
                    family: "Latina"
                  }
                }
              }
            }
          }
        };
  
        const ctx = chartRef.current.getContext("2d");
        new Chart(ctx, graph);
  
        setIsLoading(false);
        console.log("Ice: ", data);
  
      } catch(error) {
        console.log("Ops, there has benn an error: ", error);
        setIsLoading(false);
        setError(error);
      }
    }

    if(isMounted){
      getArctic();
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
        Welcome to the page displaying the extent of polar ice over the years, highlighting seasonal variations and enabling observation of changes over time.
      </h1>
      <canvas ref={chartRef} className={style["canvas"]}></canvas>
      <div className={style["analyses-container"]}>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Factors Contributing to Ice Melting</h2>
          <p className={style["analyses"]}>
            The melting of ice is influenced by various factors, including the rise in global temperatures due to human activity, climate variations, and extreme weather events. The reduction of polar ice coverage is often linked to anthropogenic climate changes.
          </p>
        </div>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Strategies for Mitigations</h2>
          <p className={style["analyses"]}>
          Mitigating ice melting requires coordinated global actions. Reducing greenhouse gas emissions, promoting energy efficiency, and adopting sustainable energy sources are crucial measures. Additionally, preserving polar ecosystems and raising public awareness are fundamental aspects of addressing this challenge.
          </p>
        </div>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Future Predictions</h2>
          <p className={style["analyses"]}>
          Forecasts suggest that, in the absence of significant measures, ice melting could persist, potentially impacting sea level rise and polar ecosystems. However, efforts to mitigate climate change can positively influence the future extent of polar ice.
          </p>
        </div>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Trends in Ice Extent</h2>
          <p className={style["analyses"]}>
          The significant decrease in the extent of polar ice since 2007, with the current peak in 2012, is a concerning trend and represents one of the most evident signs of ongoing climate change.
          </p>
        </div>
          <ul className={style["list"]}>Some key points to consider include:
            <li className={style["li-element"]}>
              The phenomenon of reduced sea ice can contribute to positive feedback for global warming. As ice reflects sunlight, its reduction exposes darker water, which absorbs more heat, further contributing to warming.
            </li>
            <li className={style["li-element"]}>
             The decrease in the extent of polar ice has significant impacts on marine ecosystems and Arctic fauna. Polar animals such as polar bears and seals rely on ice for hunting and survival.
            </li>
            <li className={style["li-element"]}>
              The reduction of polar ice can influence ocean currents, with potential global-scale impacts on weather conditions and water temperatures.
            </li>
            <li className={style["li-element"]}>
              The decrease in ice extent opens up new shipping routes, such as the Northwest Passage, with both economic and environmental implications.
            </li>
            <li className={style["li-element"]}>
              It is essential to continue systematic monitoring of polar ice extent using satellite data and other tools. Advanced climate models are crucial for better understanding the causes and predicting future developments.
            </li>
          </ul>
      </div>
      <h2 className={style["data-source"]}>
        The data source is the <a href="https://www.nasa.gov/goddard/" rel="noreferrer" className={style["source-data-link"]}>Goddard Space Flight Center</a>, which has collected and provided data on polar ice extent from the year 1979 to 2021, for the ninth month, in the northern hemisphere.
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

export default Arctic