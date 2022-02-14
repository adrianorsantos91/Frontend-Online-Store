import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class Cart extends React.Component {
  state = {
    title: '',
    price: '',
    thumbnail: '',
    arrayOfProducts: [],
  }

  componentDidMount = () => {
    this.getCartProducts();
  }

  setNewArray = async () => {
    const { cartItens } = this.props;
    // const secondTest = await api.getProductsFromId();
    const test = cartItens.map((item) => item);
    console.log(test);
  }

  getProductsFromApi = async (id) => {
    const { arrayOfProducts } = this.state;
    const result = await api.getProductsFromId(id);
    this.setState({
      arrayOfProducts: [...arrayOfProducts, result],
      title: result.title,
      price: result.price,
      thumbnail: result.thumbnail,
    });
  }

  getCartProducts = async () => {
    const { cartItens } = this.props;
    cartItens.forEach((item) => {
      this.getProductsFromApi(item);
    });
  }

  render() {
    const { price, title, thumbnail } = this.state;
    const { cartItens } = this.props;
    this.setNewArray();
    return (
      <div>
        {cartItens.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>)
          : (
            <div>
              <p data-testid="shopping-cart-product-name">{ title }</p>
              <img src={ thumbnail } alt={ title } />
              <p>
                R$
                {' '}
                { price }
              </p>
              <p data-testid="shopping-cart-product-quantity">Quantidade: </p>
            </div>
          )}
      </div>
    );
  }
}

Cart.propTypes = {
  cartItens: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Cart;
