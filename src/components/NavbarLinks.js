import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import WhitepaperPDF from '../assets/MAD_Whitepaper.pdf';
const NavbarLinks = (props) => {
    const {activePage, showDocs, toggleDocsNavbar, showDocsHandler} = props;
    const navigate = useNavigate();
    
    return(
        <>
          <div onClick={() => {
              try {
                document.getElementById('batch-auction-container').scrollIntoView({behavior: 'smooth'});
              } catch(err) {
                navigate('../', {replace: true});
              }
            }} className={`cursor-pointer select-none my-auto text-10 xs:text-15 block lg:mr-8 py-2 hover:text-white ${activePage === '/auction' ? 'text-white' : 'text-gray-60'}`}>
            Auction
          </div>
          <div onClick={() => {
              navigate('../lease', {replace: true});
            }} className={`cursor-pointer select-none my-auto text-10 xs:text-15 block lg:mx-8 py-2 hover:text-white ${activePage === '/lease' ? 'text-white' : 'text-gray-60'}`}>
            Lease My Estates
          </div>
          <div className="flex flex-col lg:flex-row w-full lg:w-auto pb-2 lg:pb-0">
            <div data-hover="" data-delay="0" className="nav-link w-dropdown ml-0 mr-0 align-top my-auto">
              <div className={`cursor-pointer select-none my-auto text-10 xs:text-15 block lg:ml-8 py-2 hover:text-white ${activePage === '/docs' ? 'text-white' : 'text-gray-60'}`} onClick={() => {
                if(showDocs) {
                  toggleDocsNavbar();
                } else {
                  showDocsHandler(!showDocs)
                }
              }}>
                Docs
              </div>
              {showDocs &&
                <nav id="docs-dropdown" className="flex flex-col block select-none lg:absolute pl-2 pr-3 ml-2 mt-0 lg:mt-2 bg-gray-500 border-r-0 border-b-0 lg:border-r-2 lg:border-b-2 border-gray-70">
                  <a href={WhitepaperPDF} download="MAD_Whitepaper.pdf" className="w-dropdown-link text-10 xs:text-15 text-gray-70 hover:text-white px-0 py-2 lg:pb-2 lg:px-2">{'Whitepaper'}</a>
                  <a href="https://wiki.mad.xyz" target="_blank" rel="noreferrer" className="w-dropdown-link text-10 xs:text-15 text-gray-70 hover:text-white px-0 py-2 lg:pb-2 lg:px-2">{'GitBook'}</a>
                </nav>
              }
            </div>
          </div>
        </>
       );
}
export default NavbarLinks;