import React from 'react';
import { Link } from 'react-router-dom';
import CategoriesList from './CategoriesList';

class Home extends React.Component {
  render() {
    return (
      <div>
        <CategoriesList />
        <Link to="/cart" data-testid="shopping-cart-button">carrinho</Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
