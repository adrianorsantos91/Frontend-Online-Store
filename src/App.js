import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Product from './components/Product';

class App extends React.Component {
  state = {
    cartId: [],
  }

  onClickButton = ({ target }) => {
    const { cartId } = this.state;
    const idProduct = target.id;
    this.setState(() => ({
      cartId: [...cartId, idProduct],
    }));
  }

  render() {
    const { cartId } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home { ...props } onClickButton={ this.onClickButton } />) }
          />
          <Route
            exact
            path="/cart"
            render={ (props) => <Cart { ...props } cartItens={ cartId } /> }
          />
          <Route path="/Product/:id" render={ (props) => <Product { ...props } /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
