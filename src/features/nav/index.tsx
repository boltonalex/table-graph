import React from 'react';
import * as S from './styles';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
}));

function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <S.StyledLink
        activeClassName='is-active'
        to='/table'
      >
        <Typography variant='body2' component='p'>
          Table
        </Typography>
      </S.StyledLink>
      <S.StyledLink
        activeClassName='is-active'
        to='/graphs'
      >
        <Typography variant='body2' component='p'>
          Graphs
        </Typography>
      </S.StyledLink>
    </div>
  );
}

export default Nav;
