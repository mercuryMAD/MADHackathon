import React, { useState } from 'react';
import '../button.css'
// import BackgroundImage from '../assets/button.svg';
const HoverImageButton = (props) => {
    const { onDragStart, onClick, className, defaultSrc, hoverSrc } = props;
    const [src, handleSrc] = useState(defaultSrc);

    const onMouseEnter = () => {
      handleSrc(hoverSrc);
    }

    const onMouseLeave = () => {
      handleSrc(defaultSrc);
    }
    
    return(
        <>
          <img onDragStart={onDragStart} src={src} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`${className}`} />
        </>
       );
}
export default HoverImageButton;