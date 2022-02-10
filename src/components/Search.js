import React, { Component } from 'react';
import ProductsList from './ProductsList';
import * as api from '../services/api';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameProduct: '',
      listProducts: [],
    }
  }
  
  handleChanges = ({ target }) => {
    this.setState({
        nameProduct: target.value,
    });
  }

  handleClick = async () => {
    const { nameProduct } = this.state;
    console.log(nameProduct);
    const getProducts = await api.getProductsFromQuery(nameProduct);
    console.log(getProducts);
    this.setState({
      listProducts: getProducts,
    });
  }

  render() {
    return (
      <div>
        <input 
        type="text" 
        data-testid="query-input" 
        onChange={ this.handleChanges }
        />
        <button 
        data-testid="query-button" 
        onClick= { this.handleClick }
        >
          Button
        </button>
      </div>
    );
  }
}

export default Search;
