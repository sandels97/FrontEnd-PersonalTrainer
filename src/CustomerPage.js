import React from 'react';
import logo from './logo.svg';
import './App.css';
import CustomerList from './components/CustomersList'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function CustomerPage() {
  return (
    <div className="App">
      <CustomerList />
    </div>
  );
}

export default CustomerPage;
