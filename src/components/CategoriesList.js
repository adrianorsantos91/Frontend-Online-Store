import React from 'react';
import * as api from '../services/api';

class CategoriesList extends React.Component {
  constructor() {
    super();
    this.state = {
      listCategories: [],
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
export default CategoriesList;
