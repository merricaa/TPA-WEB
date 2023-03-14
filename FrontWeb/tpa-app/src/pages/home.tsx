import styles from '@/styles/Home.module.css';
import ImageSlider, { ImageType } from './imageSlider';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getCookie } from 'cookies-next';
import Navbar from './navbar';
import Footer from './footer';

const ProductList = () => {};

export default function home() {
  const [images, setImages] = useState<ImageType[]>();
  const [products, setProducts] = useState<any[]>([]);
  const [user, setCurrentUser] = useState<any[]>([]);
  const token = getCookie('token');

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

  //getCurrent User
  // useEffect(() => {
  //   const currUserQuery = `query getCurrentUser{
  //     getCurrentUser{
  //       name, id,
  //     }
  //   }`;
  //   axios
  //     .post(
  //       'http://localhost:8080/query',
  //       {
  //         query: currUserQuery,
  //         // variables: variables,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       // setProducts(response.data.data.products);
  //       setCurrentUser(response.data.data.getCurrentUser);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // console.log(variables);
  //       console.log('test');
  //     });
  // }, []);

  if (products.length == 0) {
    return <div>Loading</div>;
  }
  return (
    <div className={styles.container}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="body">
        <Navbar />
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
      <Footer />
    </div>
  );
}
