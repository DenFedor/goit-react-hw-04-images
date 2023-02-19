import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { OverlayWrap, ModalWrap, ModalImg } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow='hidden';
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow='unset';
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const {img,tags}=this.props;
    return createPortal(
      <OverlayWrap onClick={this.handleBackdropClick}>
        <ModalWrap>
          <ModalImg src={img} alt={tags} />
        </ModalWrap>
      </OverlayWrap>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  img: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
