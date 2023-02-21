import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  SearchBtnSpan,
} from './Searchbar.styled';
import { SlMagnifier } from 'react-icons/sl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Searchbar = props => {
  const [q, setQ] = useState('');
  const submitFormHandler = e => {
    e.preventDefault();
    if (q.trim() === '') {
      toast('Tell me what you are looking for!');
      return;
    }
    props.onSubmit({ q });
    reset();
  };
  const changeHandler = e => {
    setQ(e.currentTarget.value);
  };
  const reset = () => {
    setQ('');
  };
  return (
    <SearchbarHeader>
      <SearchForm onSubmit={submitFormHandler}>
        <SearchFormBtn type="submit">
          <SearchBtnSpan>
            <SlMagnifier />
          </SearchBtnSpan>
        </SearchFormBtn>
        <SearchFormInput
          name="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={q}
          onChange={changeHandler}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
