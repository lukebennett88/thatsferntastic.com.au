import PropTypes from 'prop-types';
import React from 'react';

import { useLazyLoad, useGraphQL } from '../../hooks';
import { resizeShopifyImage } from '../../utils';

export function Thumbnail({ src, onClick }) {
  const { placeholderImage } = useGraphQL();
  const { ref, imgRef, isImgLoaded, handleImgLoaded, Spinner } = useLazyLoad();
  const imgSrc = src?.originalSrc
    ? resizeShopifyImage({ url: src.originalSrc, width: 300 })
    : placeholderImage.publicURL;
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="relative h-0 overflow-hidden bg-white cursor-pointer aspect-ratio-square"
    >
      <img
        ref={imgRef}
        onLoad={handleImgLoaded}
        data-src={imgSrc}
        alt=""
        className="absolute inset-0 flex items-center justify-center object-contain w-full h-full bg-white"
      />
      {!isImgLoaded && <Spinner />}
    </button>
  );
}

Thumbnail.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.object.isRequired,
};
