import React from 'react';
import PropTypes from 'prop-types';
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
    console.log(productInfo);
    this.setState({
      title: productInfo.title,
      price: productInfo.price,
      thumbnail: productInfo.thumbnail,
      attributes: productInfo.attributes,
    });
  }

  render() {
    const { title, price, thumbnail, attributes } = this.state;
    return (
      <section>
        <p data-testid="product-detail-name">{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <p>
          R$
          {' '}
          { price }
        </p>
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
};

export default Product;
