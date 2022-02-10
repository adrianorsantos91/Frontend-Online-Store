import React, { Component } from 'react';
import ProductsList from './ProductsList';
import * as api from '../services/api';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameProduct: '',
      listProducts: [],
    };
  }

  handleChanges = ({ target }) => {
    this.setState({
      nameProduct: target.value,
    });
  }

  handleClick = async () => {
    const { nameProduct } = this.state;
    const getProducts = await api.getProductsFromQuery(nameProduct);
    this.setState({
      listProducts: getProducts.results,
    });
  }

  render() {
    const { listProducts } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="query-input"
          onChange={ this.handleChanges }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        {listProducts.map((product) => (
          <ProductsList
            key={ product.id }
            title={ product.title }
            thumbnail={ product.thumbnail }
            price={ product.price }
          />))}
      </div>
    );
  }
}

export default Search;
