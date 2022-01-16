import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import LeaseM from '../assets/lease_m.svg';
import SlantButton from './SlantButton';
import CardImage from '../assets/card.png';
import ParcelGroup from './ParcelGroup';
import { getDecentralandEstates, getDecentralandParcels, MAD_ADDRESS } from '../helpers/graphql';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function LeaseEstates(props) {

  const [loading, handleLoading] = useState(false);
  const [error, handleError] = useState(false);
  const [layer, handleLayer] = useState(0);
  const [activeParcels, handleActiveParcels] = useState([]);
  const [dParcels, handleDParcels] = useState([]);
  const [cParcels, handleCParcels] = useState([]);

  const { handleActivePage, estateContract, parcelContract, estateInstance, parcelInstance, cvContract } = props;
  const { account, active } = useWeb3React();

  useEffect(() => {
    handleActivePage("/lease");
  }, []);

  useEffect(() => {
    switch(layer) {
      case 0:
        handleActiveParcels(dParcels);
        break;
      case 1:
        handleActiveParcels(cParcels);
        break;
    }
  }, [layer]);

  useEffect(() => {
    (async () => {
      // When we re-enable CV, uncomment this.
      // handleDParcels([]);
      // handleCParcels([]);

      if(account && active && estateContract && parcelContract && cvContract) {
        if(layer === 0) {
          // Decentraland
          handleError(false);
          handleLoading(true);
          let parcels = await getDecentralandParcels(parcelContract, account); //'0xeb5edfa128c39bd50879d8ea36e4e84218fa31b0'
          let estates = await getDecentralandEstates(estateContract, account);

          // Check if a parcel belongs to an estate
          for(let p of parcels) {
            try {
              let landEstateId = (await estateContract.getLandEstateId(p.tokenId));
              if(landEstateId !== null && landEstateId.isZero()) {
                // Parcel does not belong to an estate. We can display it.
                estates.push(p);
              }
            } catch(err) {
              console.log(err);
            }
          }

          handleDParcels(estates);
          handleActiveParcels(estates);
          handleLoading(false);
        } else if(layer === 1) {
          // For now, we will do nothing (CV issues, the following code should work great!)


          // CryptoVoxels
          // handleError(false);
          // handleLoading(true);

          // try {
          //   let balance = await cvContract.balanceOf(account);
          //   if(!balance) {
          //     handleCParcels([]);
          //   } else {
          //     let tcp = [];
          //     for(let i = 0; i < balance; i++) {
          //       let parcelId = await cvContract.tokenOfOwnerByIndex(account, i);
          //       let id = parcelId.toString();
          //       let data = await fetch(`https://www.cryptovoxels.com/p/${id}`, {
          //         headers: {
          //           'Content-Type': 'application/json',
          //         },
          //       }).then((res) => res.json());
          //       let extradata = await fetch(`https://www.cryptovoxels.com/grid/parcels/${id}`, {
          //         headers: {
          //           'Content-Type': 'application/json',
          //         },
          //       }).then((res) => res.json());
          //       let td = {
          //         type: 'parcel',
          //         image: data.image,
          //         name: data.name,
          //         parcel: {x: Math.ceil((extradata.parcel.x1 + extradata.parcel.x2) / 2), y: Math.ceil((extradata.parcel.z1 + extradata.parcel.z2) / 2)},
          //         tokenId: id,
          //         updateOperator: _.includes(extradata.contributors, MAD_ADDRESS),
          //       }
          //       tcp.push(td);
          //     }
          //     handleCParcels(tcp);
          //     handleActiveParcels(tcp);
          //   }
          // } catch(err) {
          //   console.log(err);
          //   handleError(true);
          // }

          // handleLoading(false);
        }
      } else {
        handleError(true);
      }
    })();
  }, [account, active, estateContract, parcelContract, layer, cvContract]);

  const lease = (obj) => {
    if(!obj) {
      return;
    }

    if(layer === 0) {
      if(obj.type === 'estate') {
        estateInstance.setUpdateOperator(obj.tokenId, MAD_ADDRESS);
      } else if(obj.type === 'parcel') {
        parcelInstance.setUpdateOperator(obj.tokenId, MAD_ADDRESS);
      }
    } else if(layer === 1) {
      window.open(`https://www.cryptovoxels.com/parcels/${obj.tokenId}`, "_blank").focus();
    }
    
  }

  const cancelLease = (obj) => {
    if(!obj) {
      return;
    }

    if(layer === 0) {
      if(obj.type === 'estate') {
        estateInstance.setUpdateOperator(obj.tokenId, ethers.constants.AddressZero);
      } else if(obj.type === 'parcel') {
        parcelInstance.setUpdateOperator(obj.tokenId, ethers.constants.AddressZero);
      }
    } else if(layer === 1) {
      window.open(`https://www.cryptovoxels.com/parcels/${obj.tokenId}`, "_blank").focus();
    }
  }

  const claimProfit = (obj) => {

  }

  const getLayerName = (layerId) => {
    switch(layerId) {
      case 0:
        return 'Decentraland';
      case 1:
        return 'CryptoVoxels';
      case 2:
        return 'The Sandbox'
    }
  }
  return (
    <>
      <div className="w-full flex flex-col text-gray-95">
        <div className="w-full flex flex-col pt-20 px-10">
          <div className="w-full flex flex-col-reverse md:flex-row max-w-7xl mx-auto my-5 xs:my-10 md:my-20 justify-center">
            <div className="flex flex-col w-full md:w-2/3 mx-auto md:ml-10 md:mr-12 my-auto">
              <div className="mx-auto md:mx-0 text-center md:text-left text-3xl sm:text-4xl lg:text-5xl font-bold">Lease Your Estates and Parcels</div>
              <div className="mx-auto md:mx-0 text-center md:text-left text-xl sm:text-2xl lg:text-3xl font-extralight">Lease your Virtual Estates to us and claim your profit</div>
            </div>
            <div className="w-1/3 md:w-1/6 md:my-auto mx-auto mb-8">
              <img className="mx-auto w-full" src={LeaseM}/>
            </div>
          </div>
          {/* <div className="flex flex-row w-full flex-wrap justify-around mt-4">
            <div className="w-64 h-40 border border-gray-95 p-4 m-4 flex flex-col justify-between">
              <div className="text-3xl sm:text-4xl lg:text-5xl">01</div>
              <div className="text-gray-75 text-lg sm:text-xl font-extralight">Select Metaverse Layer</div>
            </div>
            <div className="w-64 h-40 border border-gray-95 p-4 m-4 flex flex-col justify-between">
              <div className="text-3xl sm:text-4xl lg:text-5xl">02</div>
              <div className="text-gray-75 text-lg sm:text-xl font-extralight">Click "Lease" On Available Parcels</div>
            </div>
            <div className="w-64 h-40 border border-gray-95 p-4 m-4 flex flex-col justify-between">
              <div className="text-3xl sm:text-4xl lg:text-5xl">03</div>
              <div className="text-gray-75 text-lg sm:text-xl font-extralight">Harvest Profit with MAD</div>
            </div>
          </div> */}
        </div>
        <div className="bg-gray-525 w-full mt-8">
          <div className="w-full flex flex-row justify-center">
            <div onClick={() => {handleLayer(0);}} className={`cursor-pointer select-none my-auto text-10 xs:text-15 block py-4 hover:text-white ${layer === 0 ? 'text-white' : 'text-gray-60'}`} >{getLayerName(0)}</div>
            <div onClick={() => {handleLayer(1);}} className={`cursor-pointer select-none my-auto text-10 xs:text-15 block mx-2 xs:mx-4 sm:mx-8 py-4 hover:text-white ${layer === 1 ? 'text-white' : 'text-gray-60'}`}>CryptoVoxels</div>
            {/* <div onClick={() => {handleLayer(2);}} className={`cursor-pointer select-none my-auto text-10 xs:text-15 block py-4 hover:text-white ${layer === 2 ? 'text-white' : 'text-gray-60'}`}>The Sandbox</div> */}
          </div>
          {loading || error ?
            <>
              <div className="w-full text-center my-16 text-gray-60 select-none">{error ? 'Please log in to view your parcels and estates.' : 'Loading...'}</div>
            </>
          :
            activeParcels.length > 0 ?
              <>
                <div className="w-full flex flex-col sm:flex-row justify-center px-10">
                  <div className="sm:ml-auto sm:mr-4">
                    <SlantButton onClick={() => {}} text="Lease All" color="pink" light={true} className="mt-4 bg-gray-500 hover:bg-pink-80 text-pink-80 hover:text-gray-500 w-full md:ml-auto" />
                  </div>
                  <div className="sm:mr-auto sm:ml-4">
                    <SlantButton onClick={() => {}} text="Claim All Profit" disabled={true} color="green" light={true} color={true ? '' : 'green'} className={`${true ? '' : 'bg-gray-525 hover:bg-green-50 text-green-50 hover:text-gray-500'} mt-4 w-full`} />
                  </div>
                </div>
                <div>
                  <ParcelGroup parcels={activeParcels} layerName={getLayerName(0)} leaseCallback={lease} cancelCallback={cancelLease} claimProfitCallback={claimProfit} />
                </div>
              </>
            :
              layer === 0 ?
                <>
                  <div className="w-full text-center my-16 text-gray-60 select-none">No parcels or estates have been found for this account.</div>
                </>
              :
                <>
                  <div className="w-full text-center mt-16 text-gray-60 select-none">Coming soon... <span className="hover:text-white underline cursor-pointer" onClick={() => {window.open('https://www.cryptovoxels.com/account/parcels', '_blank').focus()}}>set MAD as contributor now</span>!</div>
                  <div className="flex mx-auto justify-center mt-4 mb-16">
                    <div className="text-gray-60 select-none mr-1">
                      Copy MAD's Contributor Address:
                    </div>
                    <CopyToClipboard text={MAD_ADDRESS}>
                      <div className="inline mb-1 cursor-pointer text-gray-60 hover:text-white">
                        <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.4375 0.1875H3.49219C3.41055 0.1875 3.34375 0.254297 3.34375 0.335938V1.375C3.34375 1.45664 3.41055 1.52344 3.49219 1.52344H12.6953V14.2891C12.6953 14.3707 12.7621 14.4375 12.8438 14.4375H13.8828C13.9645 14.4375 14.0312 14.3707 14.0312 14.2891V0.78125C14.0312 0.452832 13.7659 0.1875 13.4375 0.1875ZM11.0625 2.5625H1.5625C1.23408 2.5625 0.96875 2.82783 0.96875 3.15625V13.0032C0.96875 13.1609 1.03184 13.3112 1.14316 13.4226L4.35869 16.6381C4.39951 16.6789 4.4459 16.7123 4.496 16.7401V16.7754H4.57393C4.63887 16.7995 4.70752 16.8125 4.77803 16.8125H11.0625C11.3909 16.8125 11.6562 16.5472 11.6562 16.2188V3.15625C11.6562 2.82783 11.3909 2.5625 11.0625 2.5625ZM4.49414 14.8865L2.89658 13.2871H4.49414V14.8865ZM10.3203 15.4766H5.68164V12.8418C5.68164 12.4317 5.34951 12.0996 4.93945 12.0996H2.30469V3.89844H10.3203V15.4766Z" fill="currentColor" />
                        </svg>
                      </div>
                    </CopyToClipboard>
                  </div>
                </>
          }
        </div>
      </div>
    </>
  );
}

export default LeaseEstates;