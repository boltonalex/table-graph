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

function GraphNav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <S.StyledLink
        activeClassName='is-active'
        to='/graphs/averages'
      >
        <Typography variant='body2' component='p'>Averages</Typography>
      </S.StyledLink>
      <S.StyledLink
        activeClassName='is-active'
        to='/graphs/industry'
      >
        <Typography variant='body2' component='p'>Industry</Typography>
      </S.StyledLink>
      <S.StyledLink
        activeClassName='is-active'
        to='/graphs/individual'
      >
        <Typography variant='body2' component='p'>Individual</Typography>
      </S.StyledLink>
    </div>
  );
}

export default GraphNav;
