import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ComingSoon from './components/ComingSoon';
import Footer from './components/Footer';
import Home from './components/Home';
import LeaseEstates from './components/LeaseEstates';
import Navbar from './components/Navbar';
import WalletSelect from './components/WalletConnect';
import { useEagerConnect, useInactiveListener } from './helpers/hooks';
import { useStateWithSessionStorage } from './helpers/sessionStorage';
import { ethers } from 'ethers';
import parcels_abi from './artifacts/ParcelABI.json';
import estate_abi from './artifacts/EstateABI.json';
import cv_abi from './artifacts/CryptoVoxelsABI.json';

function App() {
  const [estateContract, handleEstateContract] = useState(null);
  const [estateInstance, handleEstateInstance] = useState(null);
  const [parcelContract, handleParcelContract] = useState(null);
  const [parcelInstance, handleParcelInstance] = useState(null);
  const [cvContract, handleCvContract] = useState(null);
  const [ensEnabled, handleEnsEnabled] = useState(false);
  const [loginType, handleLoginType] = useStateWithSessionStorage('loginType', null);
  const [ethAlias, handleEthAlias] = useState(null);
	const [ethAvatar, handleEthAvatar] = useState(null);
  const [showWalletSelect, handleShowWalletSelect] = useState(false);
  const [loggedIn, handleLoggedIn] = useState(false);
  const [activePage, handleActivePage] = useState("/home");
  const context = useWeb3React();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;

  useEffect(() => {
    (async () => {
      if(active) {
        // Decentraland contracts
        const ec = new ethers.Contract('0x959e104E1a4dB6317fA58F8295F586e1A978c297', estate_abi, library);
        const pc = new ethers.Contract('0xF87E31492Faf9A91B02Ee0dEAAd50d51d56D5d4d', parcels_abi, library);
        handleEstateContract(ec);
        handleParcelContract(pc);
        const ei = ec.connect(library.getSigner());
        const pi = pc.connect(library.getSigner());
        handleEstateInstance(ei);
        handleParcelInstance(pi);

        // CryptoVoxels contract
        const cvc = new ethers.Contract('0x79986aF15539de2db9A5086382daEdA917A9CF0C', cv_abi, library);
        handleCvContract(cvc);
      }
    })();
  }, [active]);

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  useEffect(() => {
		(async () => {
			if (!!account && !!library) {
				try{
					let alias = await library.lookupAddress(account);
					if(alias) {
						handleEthAlias(alias);

						const resolver = await library.getResolver(alias);
						const avatar = await resolver.getText("avatar");
						handleEthAvatar(avatar);
					} else {
						handleEthAvatar(null);
						handleEthAlias(null);
					}
					handleEnsEnabled(true);
				}catch(err){
					handleEnsEnabled(false);
					handleEthAvatar(null);
					handleEthAlias(null);
				}
			}
		})();
	}, [account, library]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect(loginType);

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  document.body.classList.add('bg-gray-500');

  return (
    <>
			<Router>
				<div className={`flex flex-col relative min-h-screen max-h-screen bg-gray-500`}>
					<Navbar accountData={{ethAlias: ethAlias, ethAvatar: ethAvatar}} handleLoginType={handleLoginType} loggedIn={loggedIn} activePage={activePage} handleShowWalletSelect={handleShowWalletSelect} />
					<Routes>
						<>
							<Route exact path="/" element={<Home handleActivePage={handleActivePage} />} />
              <Route exact path="/auction" element={<ComingSoon title="AUCTION" />} />
              <Route exact path="/lease" element={<LeaseEstates handleActivePage={handleActivePage} estateContract={estateContract} parcelContract={parcelContract} estateInstance={estateInstance} parcelInstance={parcelInstance} cvContract={cvContract} />} />
              <Route exact path="/stake" element={<ComingSoon title="LIQUIDITY MINING" />} /> {/* <LiquidityMining /> */ }
              <Route exact path="/docs" element={<ComingSoon title="DOCS" />} />
            </>
          </Routes>
          <Footer activePage={activePage} />
        </div>
      </Router>
      {showWalletSelect &&
        <WalletSelect handleLoginType={handleLoginType} onClose={() => {
          handleLoginType(null);
          handleShowWalletSelect(false);
        }}/>
      }
    </>
  );
}

export default App;
