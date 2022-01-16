import ComingSoonBg from '../assets/coming-soon.png';

function ComingSoon(props) {

  return (
    <>
    <div className="flex-grow flex flex-col relative text-gray-80">
      <div className="flex-grow w-full max-w-7xl mx-auto flex relative text-white">
        <div className="flex flex-col w-full">
          <div className="flex w-full h-full">
            <img className="fixed overflow-auto bottom-0 left-0 contain" src={ComingSoonBg} />
            <div className="my-auto">
              <div className="fixed w-full text-center font-tabs text-white text-4xl md:text-5xl lg:text-6xl ">
                <span className="text-pink-50">Coming soon...</span> Stay tuned.
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default ComingSoon;
