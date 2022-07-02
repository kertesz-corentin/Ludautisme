import React from "react";
import './lazyimage.scss'
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";

const LazyImage = ({ src, alt }) => {
  const refPlaceholder = React.useRef();

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
  };

  return (
    <div className="lazy-image__wrapper" style = {{height:'200px',width:'300px'}}>
      <div className="lazy-image__placeholder" ref={refPlaceholder} />
      <LazyLoad>
        <img className="lazy-image__styledImage"
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