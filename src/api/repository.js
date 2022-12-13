import { getDatabase, ref, set, onValue, off } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import { firebaseApp } from './firebase';

export default class Repository {
  constructor() {
    this.db = getDatabase(firebaseApp);
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

  getItem(directory, onUpdate) {
    const starCountRef = ref(this.db, `${directory}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      data && onUpdate(data);
    });
    return () => off(starCountRef);
  }
  // TODO:
  // 상품 수정 삭제 기능
}
