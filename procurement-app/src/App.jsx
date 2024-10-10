import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemMaster from "./pages/ItemMaster";
import Home from "./pages/Home";
import PurchaseOrder from "./pages/PurchaseOrder";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} /> 
        <Route path="/item-master" element={<ItemMaster />} />
        <Route path="/purchase-order" element={<PurchaseOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
