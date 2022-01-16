import React, { useEffect, useState } from 'react';
import '../grid.css';
import Banner from "./Banner";
import ScrollDown from "./ScollDown";
import BatchAuction from "./BatchAuction";
import LandDelegation from "./LandDelegation";

function Home(props) {
  // let navigate = useNavigate(); // to push an endpoint, call `navigate("/path");`

  const { handleActivePage } = props;

  useEffect(() => {
    handleActivePage("/home");
  }, []);

  return (
    <>
      <div className="flex-grow lg:flex-grow-0 flex flex-col relative text-gray-80 pt-20">
        <div className="w-full flex-grow lg:flex-grow-0 flex relative text-white justify-center">
          <div className="flex flex-col w-full max-w-7xl">
            <div id="banner-container" className="flex flex-col w-full">
              <Banner />
              <div className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mx-auto">METAVERSE <span className="text-green-50">A</span>DVERTISEMENT <span className="text-pink-50">D</span>AO</div>
              <div className="text-center text-lg sm:text-xl md:text-2xl mx-auto font-bold mb-10">
                Facilitate revenue-generating businesses in the metaverse
              </div>
              <ScrollDown scrollId="batch-auction-container" />
            </div>
            <div id="batch-auction-container" className="flex flex-col w-full mt-20">
              <BatchAuction />
              <ScrollDown scrollId="land-delegation-container" />
            </div>
            <div id="land-delegation-container" className="flex flex-col w-full mt-20">
              <LandDelegation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
