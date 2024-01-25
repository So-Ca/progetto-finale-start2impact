import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';
import Temperature from "./components/analysesPages/temperature/Temperature";
import Arctic from "./components/analysesPages/arctic/Arctic";
import Methane from "./components/analysesPages/methane/Methane";
import CarbonDioxide from "./components/analysesPages/carbonDioxide/CarbonDioxide";
import NitrogenDioxide from "./components/analysesPages/NitrogexDioxide/NitrogenDioxide";

function App(){

  return(
      <Router>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/temperature" element={<Temperature/>}/>
          <Route path="/no2" element={<NitrogenDioxide/>}/>
          <Route path="/ch4" element={<Methane/>}/>
          <Route path="/co2" element={<CarbonDioxide/>}/>
          <Route path="/arctic" element={<Arctic/>}/>
        </Routes>
      </Router>
  )
}

export default App