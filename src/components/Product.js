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
      email: '',
      comment: '',
      avaliation: [],
    };
  }

  componentDidMount = () => {
    this.getProducts();
  }

  sendToLocal = () => {
    const { email, comment, avaliation } = this.state;
    this.setState({
      avaliation: [...avaliation, { email, comment }],
    }, () => console.log(avaliation));
    localStorage.setItem('email', email);
    localStorage.setItem('comment', comment);
    // const result = localStorage.getItem('email');
  }

  handleInputText = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
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

        <p>Avaliações</p>
        <form>
          <input
            name="email"
            placeholder="Email"
            type="email"
            data-testid="product-detail-email"
            onChange={ this.handleInputText }
          />
          <br />
          <textarea
            name="comment"
            placeholder="Comentário sobre o produto. (opcional)"
            data-testid="product-detail-evaluation"
            onChange={ this.handleInputText }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.sendToLocal }
          >
            Enviar
          </button>
        </form>

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
