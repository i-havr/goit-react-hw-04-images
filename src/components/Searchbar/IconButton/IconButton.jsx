import React from 'react';
import PropTypes from 'prop-types';
import { IconButtonStyled } from './IconButton.styled';

export const IconButton = ({ children, ...allyProps }) => (
  <IconButtonStyled type="submit" {...allyProps}>
    {children}
  </IconButtonStyled>
);

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};
