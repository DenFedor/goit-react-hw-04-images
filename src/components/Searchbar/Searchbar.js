import React, { Component } from 'react';
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

class Searchbar extends Component {
  state = {
    q: '',
  };
  submitFormHandler = e => {
    e.preventDefault();
    if (this.state.q.trim() === '') {
      toast('Tell me what you want to see!');
      return;
    }
    this.props.onSubmit(this.state);
    this.reset();
  };
  changeHandler = e => {
    this.setState({
      q: e.currentTarget.value,
    });
  };
  reset = () => {
    this.setState({ q: '' });
  };

  render() {
    const {q} =this.state;
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.submitFormHandler}>
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
            onChange={this.changeHandler}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};