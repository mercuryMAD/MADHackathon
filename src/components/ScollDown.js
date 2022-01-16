import CarrotDown from '../assets/carrot_down_white.svg';

function ScrollDown(props) {

  const { scrollId } = props;

  return (
    <>
			<div onClick={() => {if(scrollId) {document.getElementById(scrollId).scrollIntoView({behavior: 'smooth'})}}} className="flex flex-col mx-auto justify-center cursor-pointer">
        <img className="h-4 w-4 mx-auto" src={CarrotDown}/>
        <div className="font-extralight italic">Scroll Down</div>
      </div>
    </>
  );
}

export default ScrollDown;
