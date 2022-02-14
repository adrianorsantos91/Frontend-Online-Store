import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoriesList from './CategoriesList';
import Search from './Search';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryId: '',
      nProduct: '',
      listProducts: [],
      loadProduct: false,
    };
  }

  handleClick = async () => {
    const { nProduct, categoryId } = this.state;
    const NUM = 0;
    const getProducts = await api.getProductsFromCategoryAndQuery(categoryId, nProduct);
    if (getProducts.results.length !== NUM) {
      this.setState({
        listProducts: getProducts.results,
        loadProduct: true,
      });
    } else {
      this.setState({
        loadProduct: false,
      });
    }
  }

  onclickCategory = ({ target }) => {
    this.setState({
      categoryId: target.id,
    }, () => {
      this.handleClick();
    });
  }

  handleChanges = ({ target }) => {
    this.setState({
      nProduct: target.value,
    });
  }

  render() {
    const { listProducts, loadProduct } = this.state;
    const { onClickButton } = this.props;
    return (
      <div>
        <CategoriesList
          onclickCategory={ this.onclickCategory }
        />
        <Search
          listProducts={ listProducts }
          loadProduct={ loadProduct }
          handleChanges={ this.handleChanges }
          handleClick={ this.handleClick }
          onClickButtonToCart={ onClickButton }
        />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
      </div>
    );
  }
}

Home.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};

export default Home;
