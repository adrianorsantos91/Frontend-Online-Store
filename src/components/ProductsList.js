import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductsList extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <div data-testid="product">
        <Link to={ `/Product/${id}` }>
          <div data-testid="product-detail-link">
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
        </Link>
      </div>
    );
  }
}

ProductsList.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductsList;
