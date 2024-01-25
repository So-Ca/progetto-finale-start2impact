import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import Chart from "chart.js/auto";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import style from "./carbonDioxide.module.scss";
import errorIcon from "../../../assets/img/icons/error-icon.png";

function CarbonDioxide() {

  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [error, setError] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const chartRef = useRef(null);

  useEffect( () => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect( () => {
    if(isMounted){
      getCO2();
    }
  }, []);

  // fetch dei dati
  async function getCO2(){
    try{
      setIsLoading(true);
      if(chartInstance){
        chartInstance.destroy();
      }

      const response = await axios.get("https://global-warming.org/api/co2-api");
      const data = await response.data.co2;
      const cycle = data.map( item => `${item.year}-${item.month}-${item.day}`);
      const trend = data.map( item => parseFloat(item.trend));

      // specifiche del grafico
      const graph = {
        type: "line",
        data: {
          labels: cycle,
          datasets: [
            {
              label: "CO2 Emissions",
              data: trend,
              borderColor: "#8BC1CD",
              borderWidth: 0.1,
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
                text: "CO2 Detection Date",
                color: "#8BC1CD",
                font: {
                  size: 20,
                  family: "Apex",
                  weight: "bold"
                }
              },
              ticks: {
                color: "#ffffff",
                font: {
                  size: 16,
                  family: "Metropolis"
                }
              },
              grid: {
                color: "#ffffff"
              } 
              },
            y: {
              type: "linear",
              position: "left",
              title: {
                display: true,
                text: "CO2 Concentration (PPM)",
                color: "#8BC1CD",
                font: {
                  size: 20,
                  family: "Apex",
                  weight: "bold"
                }
              },
              ticks: {
                color: "#ffffff",
                font: {
                  size: 16,
                  family: "Metropolis"
                }
              },
              grid: {
                color: "#ffffff"
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
                  family: "Apex"
                }
              }
            }
          }
        }
      };

      const ctx = chartRef.current.getContext("2d");
      const newChartInstance = new Chart(ctx, graph);

      setChartInstance(newChartInstance);
      setIsLoading(false);
      console.log("CO2: ", data);

    } catch(error){
      console.log("Ops, there has been an error: ", error);
      setIsLoading(false);
      setError(error);
    }
  }

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
        Welcome to the page displaying the CO2 emissions over the years, highlighting seasonal variations and enabling observation of changes over time.
      </h1>
      <canvas ref={chartRef} className={style["canvas"]}></canvas>
      <div className={style["analyses-container"]}>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Sources of CO2 Emissions</h2>
          <p className={style["analyses"]}>
            The emissions of carbon dioxide are primarily caused by human and natural activities that release carbon into the atmosphere. Natural sources of CO2 emissions are volcanoes, volcanic eruptions, and biological processes like the decomposition of organic matter. However, human activity has significantly increased atmospheric concentrations of CO2 compared to historical levels, thereby contributing to global warming and climate change. Mitigating CO2 emissions has become a global priority to address issues related to climate change.
          </p>
          <ul className={style["list"]}>The main anthropogenic sources of CO2 emissions include:
            <li className={style["li-element"]}>
              Use of fossil fuels
            </li>
            <li className={style["li-element"]}>
              Transportation
            </li>
            <li className={style["li-element"]}>
              Industry
            </li>
            <li className={style["li-element"]}>
              Deforestation
            </li>
            <li className={style["li-element"]}>
              Agriculture
            </li>
            <li className={style["li-element"]}>
              Solid waste
            </li>
          </ul>
        </div>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Strategies for Mitigations</h2>
          <p className={style["analyses"]}>
            To reduce carbon dioxide (CO2) emissions and mitigate the impacts of climate change, there are various strategies and actions that can be adopted at the individual, community, and global levels.
          </p>
          <ul className={style["list"]}>Some remedies to reduce CO2 emissions include
            <li className={style["li-element"]}>
            Transition to renewable energies such as solar, wind, and green hydrogen to limit dependence on fossil fuels.
            </li>
            <li className={style["li-element"]}>
            Improve energy efficiency in buildings, transportation, and industries.
            </li>
            <li className={style["li-element"]}>
            Promote sustainable mobility solutions such as public transportation, electric vehicles, and bicycles.
            </li>
            <li className={style["li-element"]}>
            Advocate for reforestation and conservation of forests that absorb carbon.
            </li>
            <li className={style["li-element"]}>
            Adopt sustainable agriculture practices using soil management techniques that reduce CO2 emissions.
            </li>
            <li className={style["li-element"]}>
            Utilize carbon capture and storage technologies in industrial plants.
            </li>
            <li className={style["li-element"]}>
              Raise awareness of energy-saving practices in homes and offices to reduce overall energy demand.
            </li>
            <li className={style["li-element"]}>
              Implement tax incentives and environmental policies that encourage low-carbon behaviors and investments.
            </li>
          </ul>
        </div>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Future Predictions</h2>
          <p className={style["analyses"]}>
            Some organizations and institutions make estimates and projections of future CO2 emissions based on various assumptions and scenarios. Without significant actions to reduce emissions, many forecasts indicate a continuous increase in CO2 emissions over the next decade due to economic growth. Global climate policies and international agreements, such as the Paris Agreement, can significantly influence these predictions. More optimistic projections suggest an accelerated transition to renewable energy sources, with a substantial reduction in emissions associated with the use of fossil fuels.
          </p>
        </div>
      </div>
      <h2 className={style["data-source"]}>
        The data source is the <a href="https://www.nasa.gov/goddard/" className={style["source-data-link"]}>Goddard Space Flight Center</a>, which has collected and provided data on CO2 emissions from the year 2014 to 2024.
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

export default CarbonDioxide