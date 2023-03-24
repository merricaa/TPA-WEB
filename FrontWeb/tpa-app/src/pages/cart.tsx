import Navbar from './navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import styles from '@/styles/Home.module.css';
import Footer from './footer';
export default function createCart() {
  const [cart, setCart] = useState<any[]>([]);
  const token = getCookie('token');
  const query = `query getCart{
    carts{
      product{
        name,
        price,
        image
      }
      quantity
    }
  }`;

  useEffect(() => {
    axios
      .post(
        'http://localhost:8080/query',
        {
          query: query,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        setCart(response.data.data.carts);
      })
      .catch((error) => {
        console.log(error);
        // console.log(variables);
        // console.log('test');
      });
  }, []);

  return (
    <div className={styles.container1}>
      <Navbar />
      <h1>Shopping Cart</h1> <h3>(3 Items )</h3>
      <center>
        {cart.map((c) => {
          console.log(c);
          return (
            <div className={styles.card}>
              <img
                src={c.product.image}
                alt=""
                className={styles.productImage}
              />
              <a className={styles.productName}>{c.product.name}</a>
              {/* <Link to={`/${p.id}`}>{p.name}</Link> */}
              <p className={styles.price}>${c.product.price}</p>
              <p>{c.product.quantity}</p>
            </div>
          );
        })}
      </center>
      <Footer />
    </div>
  );
}
