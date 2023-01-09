import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ImageGalleryStyled>
      {images?.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={() => onImageClick(image)}
        />
      ))}
    </ImageGalleryStyled>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.node.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
