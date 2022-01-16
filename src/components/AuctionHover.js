import AuctionIcon from '../assets/auction.svg';

function AuctionHover(props) {

  return (
    <>
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-col my-auto">
          <div className={`text-white lg:flex-nowrap text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-tabs lg:w-max mb-4`}>
            {"View Current Yield"}
          </div>
          <div className={`text-green-50 lg:flex-nowrap text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-tabs lg:w-max`}>
            {"Harvest Yield & Gain Profit"}
          </div>
        </div>
        <div className="mt-8 md:mt-0 flex flex-col flex-grow my-auto">
          <div className="my-auto" onDragStart={(e) => {e.preventDefault();}}>
            <img src={AuctionIcon}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuctionHover;
