import React from 'react';
import PropTypes from 'prop-types';
import { ColorRing } from 'react-loader-spinner';
import { SpinnerWrap } from './Loader.styled';
export const Loader = onLoading => {
  return (
    <SpinnerWrap>
      <ColorRing
        visible={onLoading}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />{' '}
    </SpinnerWrap>
  );
};
Loader.propTypes = {
  onLoading: PropTypes.bool.isRequired,
};
