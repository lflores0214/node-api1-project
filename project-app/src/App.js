import React from 'react';
import { Route } from "react-router-dom";
import './App.css';

import Users from "./components/Users";
import AddUser from "./components/AddUser"

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={props => <Users {...props} />} />
      <Route path="adduser" render={props => <AddUser {...props} />}/>
    </div>
  );
}

export default App;
