import { useState, useEffect } from 'react';
import fetchImages from 'services/api';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import { AppStyled } from './App.styled';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [images, setImages] = useState(null);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openModalImage, setOpenModalImage] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const perPage = 12;
  const showButton = status !== 'pending' && images && totalPages !== page;

  useEffect(() => {
    if (!query) {
      return;
    }

    const handleGetImages = async () => {
      setStatus(Status.PENDING);

      try {
        const { hits, totalHits } = await fetchImages(query, page);

        if (hits.length === 0) {
          toast.error('No matches :(');
        } else {
          // записуємо в state тільки властивості id, tags, webformatURL, largeImageURL
          const newHits = hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id: id,
              largeImageURL: largeImageURL,
              webformatURL: webformatURL,
              tags: tags,
            })
          );
          setImages(prev => (prev ? [...prev, ...newHits] : [...newHits]));
          setTotalPages(Math.ceil(totalHits / perPage));
        }
        setStatus(Status.RESOLVED);
      } catch (error) {
        toast.error('Whoops, something went wrong: ', error.message);
        setStatus(Status.REJECTED);
        return;
      }
    };
    handleGetImages();
  }, [query, page]);

  const handleSubmit = query => {
    setImages(null);
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleToggleModal = image => {
    setShowModal(prev => !prev);
    setOpenModalImage(image ? image : null);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={handleSubmit} />
      {images && (
        <ImageGallery images={images} onImageClick={handleToggleModal} />
      )}

      {status === 'pending' && <Loader />}

      {showButton && <Button onLoadMoreClick={handleLoadMore} />}

      {showModal && (
        <Modal image={openModalImage} onClose={handleToggleModal} />
      )}

      <ToastContainer autoClose={3000} />
    </AppStyled>
  );
}
