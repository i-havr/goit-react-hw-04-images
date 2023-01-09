import PropTypes from 'prop-types';
import { ImageGalleryItemStyled } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, tags },
  onImageClick,
}) => {
  return (
    <ImageGalleryItemStyled onClick={onImageClick}>
      <img src={webformatURL} alt={tags} />
    </ImageGalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
