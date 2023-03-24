import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/Detail.module.css';
import Navbar from './../../navbar';
import Footer from '@/pages/footer';
import { getCookie } from 'cookies-next';
import createCart from './../../cart';

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
  const [cart, setCart] = useState<any[]>([]);
  const token = getCookie('token');

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
      id,
      name,
      image,
      description,
      price,
      stock,
      price,
      stock,
    }
  }`;

  const handleAddToCart = () => {
    const variables = {
      productID: id,
      quantity: (document.getElementById('quantity') as HTMLInputElement).value,
      notes: '',
    };

    const cartQuery = `mutation addToCart($productID:ID!, $quantity: Int!, $notes: String!){
      createCart(productID: $productID, quantity: $quantity, notes:$notes){

      product{
        name,
        image,
        price,
        id
      }
        quantity,
        notes

      }
    }`;

    axios
      .post(
        'http://localhost:8080/query',
        {
          query: cartQuery,
          variables: variables,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        setCart(response.data.data.createCart);
      })
      .catch((error) => {
        console.log(error);
        // console.log(variables);
        console.log('test');
      });
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.div1}>
        <img src={products?.image} alt="" className={styles.productImage} />
      </div>
      <div className={styles.div2}>
        <h1 className={styles.productName}>{products?.name}</h1>
        <h3 className={styles.productPrice}>${products?.price}</h3>
      </div>
      <div className={styles.div3}>
        <div className={styles.qtyBox}>
          <input
            type="number"
            defaultValue={1}
            maxLength={3}
            min={0}
            className={styles.qtyBTN}
            id="quantity"
          ></input>
        </div>

        <button className={styles.atcBTN} onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
      {/* <p>{id}</p> */}
      {/* <Footer /> */}
    </div>
  );
};

export default ProductDetail;
