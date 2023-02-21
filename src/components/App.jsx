import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from './Loader/Loader';
import { LoadButton } from './Button/Button';
import React, { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';

const API_KEY = '31235153-11b91783de2de8bcbb11dc69c';
const API_URL = 'https://pixabay.com/api/';

export const App = () => {
  const [images, setImages] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  async function fetchImages(query, page) {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '12',
        page: page,
      },
    });
    return response.data;
  }

  useEffect(() => {
    if (!q) {
      return;
    }
    setLoading(true);
    try {
      fetchImages(q, page).then(resData => {
        if (resData.hits.length > 0) {
          setImages(prevState => [...prevState, ...resData.hits]);
          setTotalPages(Math.ceil(resData.totalHits / 12));
        } else {
          toast("We couldn't find anything. Try something else.");
          return;
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [q, page]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
    setLoading(true);
  };
  const submitHandler = data => {
    if (q !== data.q) {
      setQ(data.q);
      setImages([]);
      setPage(1);
    }
  };

  return (
    <>
      <Container>
        <Searchbar onSubmit={submitHandler} />
        {loading && <Loader onLoading={loading} />}
      </Container>
      {images.length > 0 && (
        <Container>
          <ImageGallery responseData={images} />
          {loading ? (
            <Loader onLoading={loading} />
          ) : (
            totalPages > 1 &&
            totalPages !== page && <LoadButton onClick={loadMore} />
          )}
        </Container>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
