import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledLink = styled(NavLink)`
  display: flex;
  justify-self: center;
  padding: 10px;
  color: black;
  text-decoration: none;
  
  &.is-active {
    text-decoration: underline;
  }
`;
