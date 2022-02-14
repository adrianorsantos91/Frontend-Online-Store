import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductsList from './ProductsList';

class Search extends Component {
  render() {
    const {
      listProducts,
      loadProduct,
      handleChanges,
      handleClick,
      onClickButtonToCart,
    } = this.props;
    return (
      <div>
        <input
          type="text"
          data-testid="query-input"
          onChange={ handleChanges }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ handleClick }
        >
          Pesquisar
        </button>
        {loadProduct ? listProducts.map((product) => (
          <ProductsList
            key={ product.id }
            id={ product.id }
            title={ product.title }
            thumbnail={ product.thumbnail }
            price={ product.price }
            onClickButtonToCart={ onClickButtonToCart }
          />)) : <p>Nenhum produto foi encontrado</p> }
      </div>
    );
  }
}

Search.propTypes = {
  listProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadProduct: PropTypes.bool.isRequired,
  handleChanges: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  onClickButtonToCart: PropTypes.func.isRequired,
};

export default Search;
