import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import Chart from "chart.js/auto";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import style from "./nitrogenOxide.module.scss";
import errorIcon from "../../../assets/img/icons/error-icon.png";

function NitrogenDioxide() {

  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect( () => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect( () => {
    async function getNO2(){
      try{
        setIsLoading(true);
  
        const response = await axios.get("https://global-warming.org/api/nitrous-oxide-api");
        const data = await response.data.nitrous;
        const date = data.map( item => item.date);
        const average = data.map( item => parseFloat(item.average));
  
        // specifiche del grafico
        const graph = {
          type: "line",
          data: {
            labels: date,
            datasets: [
              {
                label: "Nitrous Dioxide Emissions",
                data: average,
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
                  text: "Nitrous Dioxide Level",
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
        console.log("NO2: ", data);
  
      } catch(error) {
        console.log("Ops, there has been an error: ", error);
        setIsLoading(false);
        setError(error);
      }
    }

    if(isMounted){
      getNO2();
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
        Welcome to the page displaying the NO2 emissions over the years, highlighting seasonal variations and enabling observation of changes over time.
      </h1>
      <canvas ref={chartRef} className={style["canvas"]}></canvas>
      <div className={style["analyses-container"]}>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Sources of Nitrogen Dioxide emission</h2>
          <p className={style["analyses"]}>
            The emissions of NO2 mainly originate from various anthropogenic and natural sources, such as transportation, industry, agriculture, combustion, commercial and residential activities, fires, and natural processes like lightning. It's important to note that NO2 emissions can vary significantly depending on the region, industrial practices, types of transportation, and other factors.
          </p>
        </div>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Strategies for Mitigations</h2>
          <p className={style["analyses"]}>
            There are several approaches and remedies that can be adopted to reduce NO2 emissions. Regarding mobility, low-emission vehicles can be used, and public transportation can be utilized to decrease the number of private vehicles in circulation. Additionally, bicycles, electric scooters, and shared vehicles should be preferred when possible.<br/>
            Implementing clean and sustainable industrial and agricultural technologies, as well as using renewable energies, is crucial.<br/>
            As usual, raising awareness and educating the population about the importance of minimizing waste and utilizing clean energy can make a difference in improving the air quality we breathe.
          </p>
        </div>
          <ul className={style["list"]}>Future Predictions
            <li className={style["li-element"]}>
              In the future, through the increased electrification of transportation, it will be possible to reduce NO2 emissions from internal combustion engine vehicles.
            </li>
            <li className={style["li-element"]}>
              An increase in the use of renewable energies and a decrease in dependence on fossil fuels for energy production could positively impact overall NO2 emissions.
            </li>
            <li className={style["li-element"]}>
              The adoption of more sustainable agricultural practices and judicious management of nitrogen-based fertilizers could influence NO2 emissions from agriculture. 
            </li>
          </ul>
          <p>
            It is important to note that predictions may vary depending on how these variables evolve and any unexpected scientific discoveries or changes. The fight against NO2 emissions requires a coordinated global effort to address challenges related to air pollution.
          </p>
      </div>
      <h2 className={style["data-source"]}>
        The data source is the <a href="https://www.nasa.gov/goddard/" target="_blank" rel="noreferrer" className={style["source-data-link"]}>Goddard Space Flight Center</a>, which has collected and provided data on NO2 emissions from the year 2002 to 2023.
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

export default NitrogenDioxide