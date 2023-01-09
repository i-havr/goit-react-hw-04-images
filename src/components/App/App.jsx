import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchImages from 'services/api';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import { AppStyled } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  static propTypes = {
    perPage: PropTypes.number.isRequired,
  };

  static defaultProps = {
    perPage: 12,
  };

  state = {
    images: null,
    query: null,
    page: 1,
    totalPages: null,
    showModal: false,
    openModalImage: null,
    status: Status.IDLE,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      return this.getImages(query);
    }
    if (prevState.page < page) {
      this.getMoreImages(query, page);
    }
  }

  handleQuery = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  getImages = async query => {
    const { perPage } = this.props;

    this.setState({ images: null, page: 1, status: Status.PENDING });
    try {
      const { hits, totalHits } = await fetchImages(query);
      if (hits.length > 0) {
        // записуємо в state тільки властивості id, tags, webformatURL, largeImageURL
        const newHits = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id: id,
            largeImageURL: largeImageURL,
            webformatURL: webformatURL,
            tags: tags,
          })
        );

        this.setState({
          images: [...newHits],
          totalPages: Math.ceil(totalHits / perPage),
          status: Status.RESOLVED,
        });
      } else {
        toast.error('No matches :(');
        this.setState({ status: Status.RESOLVED });
        return;
      }
    } catch (error) {
      this.setState({ status: Status.REJECTED });
      toast.error('Whoops, something went wrong: ', error.message);
      return;
    }
  };

  getMoreImages = async (query, page) => {
    this.setState({ status: Status.PENDING });
    try {
      const { hits } = await fetchImages(query, page);
      // записуємо в state тільки властивості id, tags, webformatURL, largeImageURL
      const newHits = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
        id: id,
        largeImageURL: largeImageURL,
        webformatURL: webformatURL,
        tags: tags,
      }));
      this.setState(prevState => ({
        images: [...prevState.images, ...newHits],
        status: Status.RESOLVED,
      }));
    } catch (error) {
      toast.error('Whoops, something went wrong: ', error.message);
      this.setState({ status: Status.REJECTED });
      return;
    }
  };

  handleToggleModal = image => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      openModalImage: image ? image : null,
    }));
  };

  render() {
    const { images, page, totalPages, showModal, openModalImage, status } =
      this.state;

    const showButton = status !== 'pending' && images && totalPages !== page;

    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleQuery} />
        {images && (
          <ImageGallery images={images} onImageClick={this.handleToggleModal} />
        )}

        {status === 'pending' && <Loader />}

        {showButton && <Button onLoadMoreClick={this.handleLoadMore} />}

        {showModal && (
          <Modal image={openModalImage} onClose={this.handleToggleModal} />
        )}

        <ToastContainer autoClose={3000} />
      </AppStyled>
    );
  }
}
