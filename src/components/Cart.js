import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  /*
  state = {
    arrayOfProducts: [],
  }
  */

  render() {
    const { cartItens } = this.props;
    return (
      <div>
        {
          cartItens.length === 0
            ? (
              <p data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </p>)
            : cartItens.map(({ id, title, thumbnail, price }) => (
              <div key={ id }>
                <p data-testid="shopping-cart-product-name">{ title }</p>
                <img src={ thumbnail } alt={ title } />
                <p>
                  R$
                  {' '}
                  { price }
                </p>
                <p data-testid="shopping-cart-product-quantity">
                  Quantidade:
                  {' '}
                  {
                    cartItens.filter((item) => item.id === id).length
                  }
                </p>
              </div>))
        }
      </div>
    );
  }
}

Cart.propTypes = {
  cartItens: PropTypes.arrayOf(PropTypes.object).isRequired,
  // cartTest: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Cart;
