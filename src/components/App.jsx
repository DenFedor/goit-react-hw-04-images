import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from './Loader/Loader';
import { LoadButton } from './Button/Button';
import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';

const API_KEY = '31235153-11b91783de2de8bcbb11dc69c';
const API_URL = 'https://pixabay.com/api/';

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

class App extends Component {
  state = {
    images: [],
    q: '',
    loading: false,
    page: 1,
    totalPages: 0,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q || prevState.page !== this.state.page) {
      this.setState({ loading: true });
      try {
        const images = await fetchImages(this.state.q, this.state.page);
        if (images.hits.length > 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            totalPages: Math.ceil(images.totalHits / 12),
          }));
        } else {
          toast("We couldn't find anything. Try something else.");
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };
  submitHandler = data => {
    if (this.state.q !== data.q) {
      this.setState({ q: data.q, images: [], page: 1 });
    }
  };

  render() {
    const { images, loading, totalPages, page } = this.state;
    return (
      <>
        <Container>
          <Searchbar onSubmit={this.submitHandler} />
          {loading && <Loader onLoading={loading} />}
        </Container>
        {images.length > 0 && (
          <Container>
            <ImageGallery responseData={images} />
            {loading ? (
              <Loader onLoading={loading} />
            ) : (
              totalPages > 1 &&
              totalPages !== page && <LoadButton onClick={this.loadMore} />
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
  }
}
export default App;
