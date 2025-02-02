import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketAnalysis from "./PropertyListing";
import PropertyListing from "./PropertyListingOpenHouse";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cma" element={<MarketAnalysis />} />
        <Route path="/openhouse" element={<PropertyListing />} />
      </Routes>
    </Router>
  );
};

export default App;
