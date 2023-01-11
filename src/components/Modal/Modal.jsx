import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { BackdropStyled, ModalStyled } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ image: { tags, largeImageURL }, onClose }) {
  useEffect(() => {
    const handleKeyDown = event => event.code === 'Escape' && onClose();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event =>
    event.currentTarget === event.target && onClose();

  return createPortal(
    <BackdropStyled onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={largeImageURL} alt={tags} />
      </ModalStyled>
    </BackdropStyled>,
    modalRoot
  );
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
