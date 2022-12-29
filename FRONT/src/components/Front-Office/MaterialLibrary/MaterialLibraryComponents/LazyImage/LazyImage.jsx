import React from "react";
import './lazyimage.scss'
import PropTypes from "prop-types";
import LazyLoad, {forceVisible} from "react-lazyload";


const LazyImage = ({ src, alt, gridSize }) => {
  const refPlaceholder = React.useRef();

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
    setTimeout(()=>{forceVisible()},150);
  };

  return (
    <div className="lazy-image__wrapper" style = {{height:`${gridSize*(3/4)}px`,width:`${gridSize}px`}}>
      <div className="lazy-image__placeholder"
            style = {{height:`${gridSize*(3/4)}px`,width:`${gridSize}px`}}
            ref={refPlaceholder} />
      <LazyLoad>
        <img className="lazy-image__styledImage"
          style={{objectFit:'cover',objectPosition:'top'}}
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          src={src}
          alt={alt}
        />
      </LazyLoad>
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default LazyImage;
