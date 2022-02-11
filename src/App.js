import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Product from './components/Product';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ Cart } />
          <Route path="/Product/:id" render={ (props) => <Product { ...props } /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
