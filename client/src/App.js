import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./pages/coins/Coins";
import CoinDetails from "./pages/coinDetails/CoinDetails";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Coins />} />
        <Route exact path="/coins/:id" element={<CoinDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
