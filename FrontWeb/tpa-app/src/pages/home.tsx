import styles from '@/styles/Home.module.css';
import ImageSlider, { ImageType } from './imageSlider';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const ProductList = () => {};

export default function home() {
  const [images, setImages] = useState<ImageType[]>();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setImages([
      {
        id: 1,
        url: 'https://promotions.newegg.com/nepro/23-0248/1920x660@2xminimal.jpg',
      },
      {
        id: 2,
        url: '//promotions.newegg.com/nepro/23-0231/1920x660_sm@2x.jpg',
      },
      { id: 3, url: '//promotions.newegg.com/nepro/23-0137/1920x660@2x.jpg' },
    ]);
    const query = `query{
      products{
        id,
        name,
        image
        price,
        description
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
  }, []);

  if (products.length == 0) {
    return <div>Loading</div>;
  }
  return (
    <div className={styles.container}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className={styles.navbar}>
        <img src="/Assets/hammenu.png" alt="" className={styles.hamMenu} />
        <img src="/logo.svg" alt="" className={styles.logoNav} />
        <div>
          <img src="/Assets/location.png" alt="" className={styles.location} />
          <a href="" className={styles.deliver}>
            Deliver
          </a>
        </div>
        <input type="text" placeholder="search" className={styles.searchBar} />
        <img src="/Assests/user.png" alt="" />
        <img src="/Assets/uk.png" alt="" className={styles.uk} />/
        <div className={styles.homeSignIn}>
          <img src="/Assets/user.png" alt="" className={styles.uk} />
          <a href="/" className={styles.signUpBTN}>
            Sign In / Register
          </a>
        </div>
        <div className={styles.homeOrder}>
          <a href="" className={styles.return}>
            Return & Order
          </a>
        </div>
        <img src="/Assets/cart.png" alt="" className={styles.location} />
      </div>
      <div className="body">
        <ImageSlider images={images}></ImageSlider>
      </div>
      <div className={styles.cardContainer}>
        {products.map((p) => {
          return (
            <div key={p.id}>
              <div className={styles.card}>
                <img src={p.image} alt="" className={styles.productImage} />
                <a
                  href={`productDetail/${p.id}`}
                  className={styles.productName}
                >
                  {p.name}
                </a>
                {/* <Link to={`/${p.id}`}>{p.name}</Link> */}
                <p className={styles.price}>${p.price}</p>
                <p>
                  <button className={styles.toCart}>Add to cart</button>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
