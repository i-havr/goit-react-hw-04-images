import { useState } from 'react';
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

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    const { value } = event.currentTarget;
    setQuery(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.warn('Please enter a search term');
      return;
    }
    onSubmit(query);
    resetForm();
  };

  const resetForm = () => {
    setQuery('');
  };

  return (
    <SearchbarStyled>
      <SearchFormStyled onSubmit={handleSubmit}>
        <IconButton aria-label="Search">
          <SearchIcon width="24" height="24" />
        </IconButton>

        <SearchFormInputStyled
          type="text"
          autoComplete="off"
          autoFocus
          // value={this.state.query}
          onChange={handleInputChange}
          placeholder="Search images and photos"
        />
      </SearchFormStyled>
    </SearchbarStyled>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
