import React from 'react';
import PropTypes from 'prop-types';
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
    const { onclickCategory } = this.props;

    return (
      <div>
        { listCategories.map((category) => (
          <div key={ category.id }>
            <label data-testid="category" htmlFor={ category.id }>
              <input
                id={ category.id }
                onClick={ onclickCategory }
                type="radio"
                name="category-button"
              />
              { category.name }
            </label>
          </div>
        )) }

      </div>
    );
  }
}

CategoriesList.propTypes = {
  onclickCategory: PropTypes.func.isRequired,
};

export default CategoriesList;
