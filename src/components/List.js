import React from 'react';
import * as api from '../services/api';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      listCategories: [],
      listProducts: [],
    };
  }

  componentDidMount() {
    this.handleCategories();
  }

  handleCategories = async () => {
    const getCategories = await api.getCategories();
    this.setState({
      listCategories: getCategories,
    });
  }

  handleProducts = async () => {
    const getProducts = await api.getProductsFromQuery();
    this.setState({
      listProducts: getProducts,
    });
  }

  render() {
    const { listCategories } = this.state;
    return (
      <div>
        { listCategories.map((category) => (
          <div key={ category.id }>
            <label data-testid="category" htmlFor={ category.id }>
              <input id={ category.id } type="radio" />
              { category.name }
            </label>
          </div>
        )) }
      </div>
    );
  }
}
export default List;
