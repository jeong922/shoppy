import { getDatabase, ref, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import { firebaseApp } from './firebase';

export default class Repository {
  constructor() {
    this.db = getDatabase(firebaseApp);
  }
  addNewProduct(product, imageURL) {
    const id = uuid();
    set(ref(this.db, `products/${id}`), {
      ...product,
      id,
      title: product.title,
      price: parseInt(product.price),
      imageURL,
      description: product.description,
      option: product.option,
    });
  }
  // TODO:
  // 상품 수정 삭제 기능
}
