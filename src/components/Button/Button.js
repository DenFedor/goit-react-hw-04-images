import React from 'react';
import PropTypes from 'prop-types';
import { LoadBtn } from './Button.styled';

export const LoadButton = ({ onClick }) => {
  return (
    <LoadBtn type="button" onClick={onClick}>
      Load More
    </LoadBtn>
  );
};
LoadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
