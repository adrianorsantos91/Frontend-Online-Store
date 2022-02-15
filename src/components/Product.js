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
      note: '',
      NUMs: [],
      avaliation: [],
      avaliationLocal: [{
        email: '',
        note: '',
        comment: '',
      }],
    };
  }

  componentDidMount = () => {
    this.getProducts();
    // this.getLocalStorage();
  }

  getLocalStorage = () => {
    const avaliation = localStorage.getItem('avaliation');
    const result = JSON.parse(avaliation);
    this.setState({
      avaliationLocal: result,
    });
  }

  updateLocalStorage = () => {
    const { avaliation } = this.state;
    localStorage.setItem('avaliation', JSON.stringify(avaliation));
    this.getLocalStorage();
  }

  sendToLocal = () => {
    const { email, comment, note, avaliation } = this.state;
    this.setState({
      avaliation: [...avaliation, { email, comment, note }],
    }, () => this.updateLocalStorage());

    // localStorage.setItem('comment', comment);
    // const result = localStorage.getItem('email');
  }

  handleInputText = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  getProducts = async () => {
    const { match } = this.props;
    const productInfo = await api.getProductsFromId(match.params.id);
    const NUM1 = 1;
    const NUM2 = 2;
    const NUM3 = 3;
    const NUM4 = 4;
    const NUM5 = 5;
    const NUMs = [NUM1, NUM2, NUM3, NUM4, NUM5];
    this.setState({
      title: productInfo.title,
      price: productInfo.price,
      thumbnail: productInfo.thumbnail,
      attributes: productInfo.attributes,
      NUMs,
    });
  }

  render() {
    const { title, price, thumbnail, attributes, avaliationLocal, NUMs } = this.state;
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
        <div>
          <br />
          <p>Avaliações</p>
          <form>
            <input
              name="email"
              placeholder="Email"
              type="email"
              data-testid="product-detail-email"
              onChange={ this.handleInputText }
            />
            <div>
              <br />
              { NUMs.map((NUM) => (
                <label key={ NUM } htmlFor={ `option${NUM}` } control>
                  <input
                    name="note"
                    id={ `option${NUM}` }
                    type="radio"
                    value={ NUM }
                    data-testid={ `${NUM}-rating` }
                    onChange={ this.handleInputText }
                  />
                  {' '}
                  { NUM }
                </label>)) }
            </div>
            <br />
            <textarea
              name="comment"
              placeholder="Comentário sobre o produto. (opcional)"
              data-testid="product-detail-evaluation"
              onChange={ this.handleInputText }
            />
            <br />
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.sendToLocal }
            >
              Enviar
            </button>
          </form>
        </div>
        <div>
          { avaliationLocal.length === 0
            ? (
              <p>Não possui Avaliação</p>
            ) : (
              avaliationLocal.map(({ email, comment, note }) => (
                <div key={ email }>
                  <p>{ email }</p>
                  <p>{ note }</p>
                  <p>{ comment }</p>
                </div>
              )))}
        </div>
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
