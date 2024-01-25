import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import Chart from "chart.js/auto";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import style from "./methane.module.scss";
import errorIcon from "../../../assets/img/icons/error-icon.png";

function Methane() {

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
      getCH4();
    }
  }, []);

  // fetch dei dati
  async function getCH4(){
    try{
      setIsLoading(true);
      if(chartInstance){
        chartInstance.destroy();
      }

      const response = await axios.get("https://global-warming.org/api/methane-api");
      const data = await response.data.methane;
      const date = data.map( item => item.date);
      const average = data.map( item => parseFloat(item.average));

      const graph = {
        type: "line",
        data: {
          labels: date,
          datasets: [
            {
              label: "Methane Level",
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
                text: "Methane Level",
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
      const newChartInstance = new Chart(ctx, graph);

      setChartInstance(newChartInstance);
      setIsLoading(false);
      console.log("CH4: ", data);

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
        Welcome to the page displaying the Methane emissions level, highlighting seasonal variations and enabling observation of changes over time.
      </h1>
      <canvas ref={chartRef} className={style["canvas"]}></canvas>
      <div className={style["analyses-container"]}>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Sources of Methane Emissions</h2>
          <ul className={style["list"]}>
            <li className={style["li-element"]}>
              Extraction, processing, and transportation of natural gas can result in methane emissions into the atmosphere
            </li>
            <li className={style["li-element"]}>
              Ruminant digestion, such as in cows and sheep, produces methane as a byproduct. Additionally, the management of agricultural waste can generate methane emissions.
            </li>
            <li className={style["li-element"]}>
              Anaerobic decomposition of organic waste in landfill sites produces methane.
            </li>
            <li className={style["li-element"]}>
             Coal extraction and processing can release methane trapped in coal seams.
            </li>
            <li className={style["li-element"]}>
              Activities related to the extraction, refining, and transportation of oil and gas can lead to methane losses.
            </li>
          </ul>
        </div>
        <div className={style["section"]}>
          <h2 className={style["subheading"]}>Strategies for Mitigations</h2>
          <p className={style["analyses"]}>
            Reducing methane emissions is crucial to addressing climate change. Measures such as capturing and utilizing methane, reduction of food waste, use of sustainable technologies for coal extraction along with adopting more sustainable agricultural practices, can contribute to mitigating this environmental impact.
          </p>
        </div>
          <h2 className={style["subheading"]}>Future Predictions</h2>
          <p className={style["analyses"]}>
            The future predictions regarding methane are characterized by a dual perspective of positive and negative impacts. On one hand, an increase in methane usage as a transitional energy source is anticipated, particularly in the context of natural gas. However, this raises concerns about the growing methane emissions, a potent greenhouse gas. Methane capture and utilization technologies are emerging as key solutions to mitigate this negative impact.
          </p>
          <p className={style["analyses"]}>
            On the other hand, there is an expected rise in efforts to reduce methane emissions, driven by stricter regulations, economic incentives, and growing environmental awareness. Investments in targeted research and development for sustainable technologies could lead to significant progress in managing methane emissions. Striking a balance between the increase in methane usage and efforts to limit emissions will be crucial in defining the future role of this gas in global environmental challenges
          </p>
      </div>
      <h2 className={style["data-source"]}>
        The data source is the <a href="https://www.nasa.gov/goddard/" className={style["source-data-link"]}>Goddard Space Flight Center</a>, which has collected and provided data on ch4 emissions from the year 1984 to 2023.
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

export default Methane