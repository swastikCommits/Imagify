import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuyCredit from "./pages/BuyCredit";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

const App = () => {

  const {showLogin} = useContext(AppContext);

  return (
    <div className='px-8 sm:px-12 md:px-16 lg:px-36 min-h-screen bg-gradient-to-b from-teal-50 to-teal-100'>
      <Navbar/>  {/* will be deisplayed on all the pages */}
      {showLogin && <Login/>}  
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/result" element={<Result />} /> 
        <Route path="/buy" element={<BuyCredit />} /> 
      </Routes>
      <Footer/>  {/* will be deisplayed on all the pages */}
      
    </div>
  );
};

export default App;