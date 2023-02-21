import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { OverlayWrap, ModalWrap, ModalImg } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');
export const Modal = props => {
  useEffect(() => {
    window.addEventListener('keydown', handleClose);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleClose);
      document.body.style.overflow = 'unset';
    };
  }, []);
  const handleClose = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      props.onClose();
    }
  };
  const { img, tags } = props;
  return createPortal(
    <OverlayWrap onClick={handleClose}>
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
