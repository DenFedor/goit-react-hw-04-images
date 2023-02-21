import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { OverlayWrap, ModalWrap, ModalImg } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');
export const Modal = ({img,tags,onClose}) => {
 useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow='hidden';
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow='unset';
    };
  });

 const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
    onClose();
    }
  };

  return createPortal(
    <OverlayWrap onClick={handleBackdropClick}>
      <ModalWrap>
        <ModalImg src={img} alt={tags} />
      </ModalWrap>
    </OverlayWrap>,
    modalRoot
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
