import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Product from './components/Product';
import * as api from './services/api';

class App extends React.Component {
  state = {
    cartComplete: [],
    cartTest: [],
  }

  getItems = async (item) => {
    const { cartComplete } = this.state;
    const result = await api.getProductsFromId(item);
    this.setState(() => ({
      cartComplete: [...cartComplete, result],
    }));
  }

  onClickButton = ({ target }) => {
    const { cartTest } = this.state;
    const idProduct = target.id;
    this.setState({
      cartTest: [...cartTest, target.id],
    });
    this.getItems(idProduct);
  }

  render() {
    const { cartComplete, cartTest } = this.state;
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
            render={ (props) => (
              <Cart { ...props } cartItens={ cartComplete } cartTest={ cartTest } />) }
          />
          <Route path="/Product/:id" render={ (props) => <Product { ...props } /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
