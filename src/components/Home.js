import React from 'react';
import { Link } from 'react-router-dom';
import CategoriesList from './CategoriesList';
import Search from './Search';

class Home extends React.Component {
  render() {
    return (
      <div>
        <CategoriesList />
        <Search />
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
