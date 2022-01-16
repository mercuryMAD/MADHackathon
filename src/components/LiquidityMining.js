import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';

function LiquidityMining() {
  const [tvl, handleTvl] = useState(12345);
  const [stakedTokens, handleStakedTokens] = useState('--');
  const [apr, handleApr] = useState('--');
  const [unstakedTokens, handleUnstakedTokens] = useState('--');
  const navigate = useNavigate();

  return (
    <>
			<div className="flex flex-col w-full text-gray-95 pt-20">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold mx-auto mt-5 xs:mt-10 md:mt-20">Liquidity Mining</div>
        <div className="text-gray-75 mx-auto text-center sm:w-3/4 text-lg sm:text-xl font-extralight mt-4">Stake ETH/MAD LP Token to Earn MAD Reward Tokens</div>
        <div className="mx-auto text-center sm:w-3/4 text-lg sm:text-xl font-bold mt-4">Current TVL: ${tvl}</div>
        <div className="px-4 px-auto w-full">
          <div className="mt-12 max-w-4xl px-4 sm:mx-auto bg-gray-550 rounded-lg flex flex-col w-full sm:w-3/4 lg:w-2/3">
            <div className="m-4 flex flex-row w-full">
              <img className="h-6 sm:h-9 my-auto w-auto select-none" src={logo} alt="MAD"/>
              <div className="ml-2 text-gray-95 text-2xl sm:text-4xl font-semibold ">MAD Token</div>
            </div>
            <div className="mb-4 flex flex-col flex-no-wrap md:flex-row md:flex-wrap justify-around">
              <div className="flex flex-col m-4 w-60">
                <div className="text-xl sm:text-2xl text-gray-95 mx-auto text-center font-semibold">{stakedTokens}</div>
                <div className="text-md sm:text-lg text-gray-60 mx-auto text-center my-1">Staked MAD/ETH LP Tokens</div>
                <div className="cursor-pointer mt-2 rounded-md bg-gray-510 hover:bg-gray-500 text-center py-2 px-4" onClick={() => {}}>Stake</div>
              </div>
              <div className="flex flex-col m-4 w-60">
                <div className="text-xl sm:text-2xl text-gray-95 mx-auto text-center font-semibold">{apr}% APR</div>
                <div className="text-md sm:text-lg text-gray-60 mx-auto text-center my-1">(Estimated)</div>
                <div className="cursor-pointer mt-2 rounded-md bg-gray-510 hover:bg-gray-500 text-center py-2 px-4" onClick={() => {}}>Claim</div>
              </div>
              <div className="flex flex-col m-4 w-60">
                <div className="text-xl sm:text-2xl text-gray-95 mx-auto text-center font-semibold">{unstakedTokens}</div>
                <div className="text-md sm:text-lg text-gray-60 mx-auto text-center my-1">Unstake Tokens</div>
                <div className="cursor-pointer mt-2 rounded-md bg-gray-510 hover:bg-gray-500 text-center py-2 px-4" onClick={() => {}}>{`Unstake & Claim`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiquidityMining;
