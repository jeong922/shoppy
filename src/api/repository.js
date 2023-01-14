import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import { app } from './firebase';

export default class Repository {
  constructor() {
    this.db = getDatabase(app);
  }

  addNewProduct(product, imageURL) {
    const id = uuid();
    return set(ref(this.db, `products/${id}`), {
      ...product,
      id,
      title: product.title,
      price: parseInt(product.price),
      imageURL,
      description: product.description,
      options: product.options,
    });
  }

  async getProducts() {
    return get(ref(this.db, `products`)).then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
  }

  async getCart(userId) {
    return get(ref(this.db, `carts/${userId}`)).then((snapshot) => {
      const data = snapshot.val() || {};
      return Object.values(data);
    });
  }

  async updateCart(userId, product) {
    return set(ref(this.db, `carts/${userId}/${product.itemId}`), product);
  }

  async removeCartItem(userId, productId) {
    return remove(ref(this.db, `carts/${userId}/${productId}`));
  }
}
