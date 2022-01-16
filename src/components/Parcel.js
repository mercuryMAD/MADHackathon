import LocationIcon from '../assets/location.svg';
import SlantButton from './SlantButton';

const Parcel = (props) => {

  const { parcel, i, layerName, leaseCallback, cancelCallback, claimProfitCallback } = props;

  return (
    <div key={`op-${i}`} className="h-100 w-64 mx-6 bg-gray-bg rounded-sm flex flex-col mt-10 shadow-xl">
      <img className="h-auto w-full m-auto min-h-1/2 min-w-full" src={parcel.image} />
      <div className="h-1/2 w-full px-4 py-2">
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex flex-row">
            <div className="text-gray-text-light text-sm">{parcel.name ? parcel.name : 'Parcel'}</div>
            <div className="bg-gray-40 my-auto ml-auto px-2 py-1 rounded-md flex flex-row flex-shrink-0">
              {
                parcel.type === 'estate' ?
                <div className="text-xs my-auto">{`${parcel.parcels.length} Parcels`}</div>
                :
                <>
                <img className="h-4 w-4 my-auto" src={LocationIcon} />
                <div className="text-xs ml-1 my-auto">{`${parcel.parcel ? parcel.parcel.x : '--'}, ${parcel.parcel? parcel.parcel.y : '--'}`}</div>
                </>
              }
            </div>
          </div>
          {/* <div>
            <div className="text-gray-60 text-sm">{layerName}</div>
          </div> */}
          <div className="w-full mt-auto mb-2">
            {/* <div className="flex flex-row flex-wrap w-full justify-start">
              {parcel.tags.map((tag, j) => (
                <div key={`${parcel.title}-tag-${j}`} className={`rounded-md px-2 py-1 text-xs mr-2 cursor-default select-none bg-${tag.color}`}>{tag.name}</div>
              ))}
              <SlantButton onClick={() => {}} text="Claim All Profit" color="green" className="mt-4 bg-gray-500 hover:bg-green-50 text-green-50 hover:text-gray-500 w-full" />
            </div> */}
            <div className="flex flex-row mt-2">
              {
                parcel.updateOperator ?
                <>
                  <div>
                    <SlantButton onClick={() => {cancelCallback(parcel);}} text="Cancel" light={true} className="bg-gray-525 hover:bg-black text-white w-full" />
                  </div>
                  <div className="ml-auto">
                    <SlantButton onClick={() => {claimProfitCallback(parcel);}} text="Claim Profit" disabled={true} light={true} color={true ? '' : 'green'} className={`${true ? '' : 'bg-gray-525 hover:bg-green-50 text-green-50 hover:text-gray-500'} w-full`} />
                  </div>
                </>
                :
                <>
                  <div className="ml-auto">
                    <SlantButton onClick={() => {leaseCallback(parcel);}} text="Lease" light={true} color="pink" className="bg-gray-500 hover:bg-pink-80 text-pink-80 hover:text-gray-500 w-full" />
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parcel;
