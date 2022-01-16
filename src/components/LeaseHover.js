import LeaseIcon from '../assets/lease.svg';

function LeaseHover(props) {

  return (
    <>
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-col my-auto">
          <div className={`text-white lg:flex-nowrap text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-tabs lg:w-max mb-4`}>
            {"24 hour Auction Epoch"}
          </div>
          <div className={`text-pink-70 lg:flex-nowrap text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-tabs lg:w-max`}>
            {"Flexible Network and Currency Selection"}
          </div>
        </div>
        <div className="mt-8 md:mt-0 flex flex-col flex-grow my-auto">
          <div className="my-auto" onDragStart={(e) => {e.preventDefault();}}>
            <img src={LeaseIcon}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaseHover;
