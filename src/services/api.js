export async function getCategories() {
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    const response = await fetch(url);
    const categories = await response.json();
    return categories;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    const response = await fetch(url);
    const products = await response.json();
    return products;
  } catch (error) {
    return error;
  }
}

// export async function getProductsFromQuery(query) {
//   try {
//     const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
//     const response = await fetch(url);
//     const products = await response.json();
//     return products;
//   } catch (error) {
//     return error;
//   }
// }

// export async function getProductsFromCategory(categoryId) {
//   try {
//     const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
//     const response = await fetch(url);
//     const products = await response.json();
//     return products;
//   } catch (error) {
//     return error;
//   }
// }
