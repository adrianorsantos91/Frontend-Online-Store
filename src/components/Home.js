import React from 'react';
import { Link } from 'react-router-dom';
import CategoriesList from './CategoriesList';
import Search from './Search';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryId: '',
      nameProduct: '',
      listProducts: [],
      loadProduct: false,
    };

    this.onclickCategory = this.onclickCategory.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async () => {
    const { nameProduct, categoryId } = this.state;
    const NUM = 0;
    const getProducts = await api.getProductsFromCategoryAndQuery(categoryId, nameProduct);
    console.log(getProducts.results);
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
    },() => {
      this.handleClick();
    });
   
  }

  handleChanges = ({ target }) => {
    this.setState({
      nameProduct: target.value,
    });
  }

  render() {
    const { listProducts, loadProduct } = this.state;
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
        />
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
