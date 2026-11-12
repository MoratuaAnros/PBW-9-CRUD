const { ApiError } = require('./errors');

function createProductService() {
  const products = new Map();
  let nextId = 1;

  function find(id) {
    const product = products.get(id);
    if (!product) {
      throw new ApiError(404, 'PRODUCT_NOT_FOUND', 'Produk tidak ditemukan.');
    }
    return product;
  }

  return {
    list: () => [...products.values()],
    find,
    create(fields) {
      const product = { id: nextId++, ...fields };
      products.set(product.id, product);
      return product;
    },
    replace(id, fields) {
      find(id); // Pastikan produknya ada (kalau gak ada, lempar 404)
      const product = { id, ...fields }; // Membuat representasi baru dengan ID lama dan field baru
      products.set(id, product);
      return product;
    },
    update(id, fields) {
      const product = { ...find(id), ...fields };
      products.set(id, product);
      return product;
    },
    remove(id) {
      find(id);
      products.delete(id);
    }
  };
}

module.exports = { createProductService };