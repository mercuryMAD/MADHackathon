import { useState } from 'react';
import SlantButton from "./SlantButton";
import { useNavigate } from "react-router-dom";
import PeaksIcon from '../assets/peaks.svg';
import LandDelegationImage from '../assets/land_delegation.svg';

function LandDelegation() {
  const [totalParcelPercentageCryptovoxel, handleTotalParcelPercentageCryptovoxel] = useState(2);
  const [totalParcelCountDecentraland, handleTotalParcelCountDecentraland] = useState(40);
  const navigate = useNavigate();

  return (
    <>
			<div className="flex flex-col w-full mb-8 md:mb-8 lg:mb-0">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold mx-auto">Land Delegation</div>
        <div className="mx-auto text-center sm:w-3/4 text-lg italic font-extralight mt-4">Land providers can delegate any amount of land in the metaverse worlds to the DAO. Users can <span className="font-bold">view current yield</span>, <span className="font-bold">harvest their yield</span>, or even <span className="font-bold">redeem their estate anytime on our website</span>.</div>
        <div className="mx-auto mt-8 mb-12">
          <SlantButton onClick={() => {navigate('../lease', {replace: true})}} text="Lease My Estates" color="green" className="bg-gray-500 hover:bg-green-50 text-green-50 hover:text-gray-500 w-full" />
        </div>
        <div className="relative flex flex-row">
          <div className="w-full min-h-72">
            <img className="w-full" src={LandDelegationImage} />
          </div>
          <div className="absolute mt-16 sm:mt-28 md:mt-40 lg:mt-44 xl:mt-56 left-0 ml-8 xs:ml-12 sm:ml-12 md:ml-20 lg:ml-44 flex flex-col">
            <div className="text-2xl text-gray-90 font-semibold">Cryptovoxels</div>
            <div className="my-2 text-lg text-gray-80">Current Delegated Parcels</div>
            <div className="flex flex-row">
              <img className="h-8 w-8 my-auto" src={PeaksIcon} />
              <div className="text-lg text-gray-80 my-auto"><span className="mx-1 text-xl text-white font-semibold my-auto">{totalParcelPercentageCryptovoxel}%</span> {`of total parcels in the world`}</div>
            </div>
          </div>
          <div className="absolute mt-48 sm:mt-36 md:mt-48 lg:mt-56 xl:mt-72 xs:right-0 ml-8 mr-8 xs:mr-12 sm:mr-12 md:mr-20 lg:mr-44 flex flex-col">
            <div className="text-2xl text-gray-90 font-semibold">Decentraland</div>
            <div className="my-2 text-lg text-gray-80">Current Delegated Parcels</div>
            <div className="flex flex-row">
              <img className="h-8 w-8 my-auto" src={PeaksIcon} />
              <div className="text-lg text-gray-80 my-auto"><span className="mx-1 text-xl text-white font-semibold my-auto">{totalParcelCountDecentraland}+</span> {`land parcels`}</div>
            </div>
          </div>
        </div>
        {/* <div className="w-full flex flex-col md:flex-row">
          <div className="w-1/2 mx-auto">
            <img className="mx-auto w-3/4" src={Hammer}/>
          </div>
          <div className="relative md:w-1/2 flex flex-col w-full overflow-hidden">
            <img className="absolute left-0 right-0 mx-1/4 z-10" src={BatchAuctionImage}/>
            <div className="z-20">
              <div className="text-center md:text-left text-2xl sm:text-3xl md:text-4xl">Auction</div>
              <div className="flex flex-row md:flex-col w-full justify-evenly md:justify-start">
                <div className="mt-6 md:mt-2 lg:mt-10">
                  <div className="text-gray-80">Current Highest Bid</div>
                  <div className="flex flex-row my-2">
                    <img className="h-8 mr-2 my-auto" src={EthIcon}/>
                    <div className="text-4xl">{auctionBidEth}</div>
                  </div>
                  <div className="text-gray-80 text-sm">${ethToDollars(auctionBidEth)}</div>
                </div>
                <div className="mt-6 md:mt-2 lg:mt-6">
                  <div className="text-gray-80">Auction Ends In</div>
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <div className="text-4xl font-bold my-2 md:mb-0 md:mt-1">{hours}</div>
                      <div className="text-sm text-gray-80">Hours</div>
                    </div>
                    <div className="flex flex-col mx-8">
                      <div className="text-4xl font-bold my-2 md:mb-0 md:mt-1">{minutes}</div>
                      <div className="text-sm text-gray-80">Minutes</div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-4xl font-bold my-2 md:mb-0 md:mt-1">{seconds}</div>
                      <div className="text-sm text-gray-80">Seconds</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default LandDelegation;
