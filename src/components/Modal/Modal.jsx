import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { BackdropStyled, ModalStyled } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => event.code === 'Escape' && this.props.onClose();

  handleBackdropClick = event =>
    event.currentTarget === event.target && this.props.onClose();

  render() {
    const { tags, largeImageURL } = this.props.image;

    return createPortal(
      <BackdropStyled onClick={this.handleBackdropClick}>
        <ModalStyled>
          <img src={largeImageURL} alt={tags} />
        </ModalStyled>
      </BackdropStyled>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
