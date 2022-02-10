import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductsList extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <div data-testid="product">
        <p>
          { title }
        </p>
        <img src={ thumbnail } alt={ title } />
        <p>
          R$
          {' '}
          { price }
        </p>
      </div>
    );
  }
}

ProductsList.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductsList;
