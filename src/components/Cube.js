function Cube(props) {

  const { image } = props;

  return (
    <>
      <div className="mt-8 md:mt-0 flex-grow my-auto">
        <div className="my-auto" onDragStart={(e) => {e.preventDefault();}}>
          <img src={image}/>
        </div>
      </div>
    </>
  );
}

export default Cube;
