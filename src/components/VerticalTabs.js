function VerticalTabs(props) {
  const { itemList, activeItem, handleActiveItem } = props;

  if(!itemList) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-col w-auto overflow-y-auto h-full md:ml-8">
        {itemList.map((item, i) => (
          <div key={`item-${i}`} className={`${activeItem === i ? 'text-white' : 'text-gray-70'} ${item.link.length > 0 ? 'cursor-pointer ' : ''}select-none flex-nowrap text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-tabs w-max`} onMouseEnter={() => {if(item.link.length > 0) {handleActiveItem(i);}}} onClick={() => {if(item.link.length > 0) {window.open(item.link, '_blank');}}}>
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default VerticalTabs;
