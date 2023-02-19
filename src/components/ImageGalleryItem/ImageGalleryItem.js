import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  onClickImageHandler = e => {
    e.currentTarget.tagName === 'IMG' && this.toggleModal();
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <>
        <GalleryItem>
          <GalleryItemImage
            onClick={this.onClickImageHandler}
            src={this.props.image}
            alt={this.props.tag}
          />
        </GalleryItem>
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            img={this.props.largeImage}
            tags={this.props.tag}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
