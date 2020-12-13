import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import * as S from './styles';
import Averages from './Averages';
import Industry from './Industry';
import Individual from './Individual';
import GraphNav from '../graphNav';

import '../../App.css';

export function GraphsPage() {
  return (
    <>
      <Router>
        <GraphNav/>
        <Route exact path='/graphs'>
          <Redirect to='/graphs/averages' />
        </Route>
        <Route path='/graphs/averages'>
          <S.GraphContainer>
            <Averages />
          </S.GraphContainer>
        </Route>
        <Route path='/graphs/industry'>
          <S.GraphContainer>
            <Industry />
          </S.GraphContainer>
        </Route>
        <Route path='/graphs/individual'>
          <S.GraphContainer>
            <Individual />
          </S.GraphContainer>
        </Route>
      </Router>
    </>
  );
}
