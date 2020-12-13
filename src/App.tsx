import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Nav from './features/nav';
import DataTable from './features/table';
import { GraphsPage } from './features/graphs';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Nav />
        <Route exact path='/'>
          <Redirect to='/table' />
        </Route>
        <Route path='/table'>
          <DataTable />
        </Route>
        <Route path='/graphs'>
          <GraphsPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
