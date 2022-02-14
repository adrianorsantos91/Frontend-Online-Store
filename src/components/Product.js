import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      price: '',
      thumbnail: '',
      attributes: [],
    };
  }

  componentDidMount = () => {
    this.getProducts();
  }

  getProducts = async () => {
    const { match } = this.props;
    const productInfo = await api.getProductsFromId(match.params.id);
    this.setState({
      title: productInfo.title,
      price: productInfo.price,
      thumbnail: productInfo.thumbnail,
      attributes: productInfo.attributes,
    });
  }

  render() {
    const { title, price, thumbnail, attributes } = this.state;
    const { onClickButton, match } = this.props;
    return (
      <section>
        <div>
          <Link
            data-testid="shopping-cart-button"
            to="/cart"
          >
            Carrinho
          </Link>
        </div>
        <div>
          <p data-testid="product-detail-name">{ title }</p>
          <img src={ thumbnail } alt={ title } />
          <p>
            R$
            {' '}
            { price }
          </p>
        </div>
        <button
          id={ match.params.id }
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ onClickButton }
        >
          Adicionar ao Carrinho
        </button>
        <aside>
          {attributes.map((attribute) => (
            <div key={ attribute.id }>
              <p>
                {attribute.name}
                :
                {' '}
                {attribute.value_name}
              </p>
            </div>
          ))}
        </aside>
      </section>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  onClickButton: PropTypes.func.isRequired,
};

export default Product;
