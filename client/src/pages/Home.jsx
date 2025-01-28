import React from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Description from "../components/Description";


const Home = () => {
  return (
    <div>
      <div>
        <Header/>
        <Steps/>
        <Description/>
      </div>
    </div>
  );
};

export default Home;