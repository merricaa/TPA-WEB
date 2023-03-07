import { useRouter } from 'next/router';
import { useState } from 'react';
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
  axios
    .post('http://localhost:8080/query', {
      query: query,
      // variables: variables,
    })
    .then((response) => {
      console.log(response);
      setProducts(response.data.data.products);
    })
    .catch((error) => {
      console.log(error);
      // console.log(variables);
      console.log('test');
    });

  return (
    <div className={styles.ProductDetailContainer}>
      {/* <p>{id}</p> */}
      <h1>{products?.name}</h1>
    </div>
  );
};

export default ProductDetail;
