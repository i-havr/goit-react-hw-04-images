import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.styled';

export const Button = ({ onLoadMoreClick }) => {
  return (
    <ButtonStyled type="button" onClick={() => onLoadMoreClick()}>
      <span>Load more</span>
    </ButtonStyled>
  );
};

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};
