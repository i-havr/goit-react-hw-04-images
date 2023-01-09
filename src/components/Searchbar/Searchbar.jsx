import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchbarStyled,
  SearchFormStyled,
  SearchFormInputStyled,
} from './Searchbar.styled';
import { IconButton } from './IconButton/IconButton';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = event => {
    const { value } = event.currentTarget;

    this.setState({
      query: value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      toast.warn('Please enter a search term');
      return;
    }

    this.props.onSubmit(this.state.query);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchbarStyled>
        <SearchFormStyled onSubmit={this.handleSubmit}>
          <IconButton aria-label="Search">
            <SearchIcon width="24" height="24" />
          </IconButton>

          <SearchFormInputStyled
            type="text"
            autoComplete="off"
            autoFocus
            // value={this.state.query}
            onChange={this.handleInputChange}
            placeholder="Search images and photos"
          />
        </SearchFormStyled>
      </SearchbarStyled>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
