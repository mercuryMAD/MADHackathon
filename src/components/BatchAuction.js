import SlantButton from "./SlantButton";
import BatchAuctionImage from '../assets/batch_auction.svg';
import EthIcon from '../assets/eth_logo.svg';
import Hammer from '../assets/hammer.png';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentEthPriceInUsd } from "../helpers/chainlink";

function BatchAuction() {
  const [auctionBidEth, handleAuctionBidEth] = useState(1.2);
  const [ethToDollars, handleEthToDollars] = useState('$--');
  const [hours, handleHours] = useState(20);
  const [minutes, handleMinutes] = useState(45);
  const [seconds, handleSeconds] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const val = (await getCurrentEthPriceInUsd()) * auctionBidEth;
      handleEthToDollars('$' + val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    })();
  }, [auctionBidEth]);

  return (
    <>
			<div className="flex flex-col w-full mb-8 md:mb-0">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold mx-auto">Batch Auction</div>
        <div className="mx-auto text-center sm:w-3/4 text-lg italic font-extralight mt-4">As MAD batches chunks of lands together, advertisement rights are auctioned. With a collection of land owners, <span className="font-bold">the value of parcels will increase</span> and can be <span className="font-bold">put into greater use</span>.</div>
        <div className="mx-auto mt-8 mb-12">
          <SlantButton onClick={() => {navigate('../auction', {replace: true})}} text="Attend Auction" color="pink" className="bg-gray-500 hover:bg-pink-80 text-pink-80 hover:text-gray-500 w-full" />
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-1/3 md:w-auto mx-auto flex">
            <img className="max-h-full my-auto" src={Hammer}/>
          </div>
          <div className="relative flex flex-col w-full overflow-hidden md:overflow-visible md:my-auto mt-4 my-0">
            <img className="absolute left-0 right-0 z-10 mt-0 md:-mt-8 lg:-mt-16" src={BatchAuctionImage}/>
            <div className="z-20 my-auto mt-4 md:mt-0 md:ml-12">
              <div className="text-center mb-0 md:mb-8 md:text-left text-2xl sm:text-3xl md:text-4xl">Auction</div>
              <div className="flex flex-row md:flex-col w-full justify-evenly md:justify-start">
                <div className="mt-6 md:mt-2 lg:mt-10">
                  <div className="text-gray-80">Current Highest Bid</div>
                  <div className="flex flex-row my-2">
                    <img className="h-8 mr-2 my-auto" src={EthIcon}/>
                    <div className="text-4xl">{auctionBidEth}</div>
                  </div>
                  <div className="text-gray-80 text-sm">{ethToDollars}</div>
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
        </div>
      </div>
    </>
  );
}

export default BatchAuction;
