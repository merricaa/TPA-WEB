import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/Detail.module.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const ProductDetail = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product | null>(null);
  const { id } = router.query;

  useEffect(() => {
    axios
      .post('http://localhost:8080/query', {
        query: query,
        variables: {
          id: id,
        },
      })
      .then((response) => {
        console.log(response);
        setProducts(response.data.data.product);
      })
      .catch((error) => {
        console.log(error);
        // console.log(variables);
        console.log('test');
      });
  }, [id]);

  const query = `query($id:ID!){
    product(id:$id){
      id
      name
      image
      description
      price
      stock
      price
      stock
    }
  }`;

  return (
    <div className={styles.container}>
      <div className={styles.div1}>
        <img src={products?.image} alt="" className={styles.productImage} />
      </div>
      <div className={styles.div2}>
        <h1>test</h1>

      </div>
      <div className={styles.div3}>
        <h1 className={styles.productName}>{products?.name}</h1>
        <h3 className={styles.productPrice}>${products?.price}</h3>
      </div>
      {/* <p>{id}</p> */}
    </div>
  );
};

export default ProductDetail;
