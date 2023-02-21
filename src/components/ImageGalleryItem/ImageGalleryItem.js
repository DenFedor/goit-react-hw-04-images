import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem=(props)=>{
  const [showModal,setModal]=useState(false);
  const onClickImageHandler = e => {
        e.currentTarget.tagName === 'IMG' && toggleModal();
      };
  const toggleModal = () => {
    setModal(({ showModal }) => ({
              showModal: !showModal,
            }))
          };
          return (
            <>
              <GalleryItem>
                <GalleryItemImage
                  onClick={onClickImageHandler}
                  src={props.image}
                  alt={props.tag}
                />
              </GalleryItem>
              {showModal && (
                <Modal
                  onClose={toggleModal}
                  img={props.largeImage}
                  tags={props.tag}
                />
              )}
            </>
          );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
