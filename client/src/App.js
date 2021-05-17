import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div>
      <h1>Hello world</h1>

      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/" component={Login} />
        <Route exact path="/" component={Signup} />
      </BrowserRouter>
    </div>
  );
}

export default App;
