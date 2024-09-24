import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProvidersScreen from './screens/Provider';
import ApiDetailsScreen from './screens/ApiDetailsScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/apis" element={<ApiDetailsScreen />} />
        <Route path="/" element={<ProvidersScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
