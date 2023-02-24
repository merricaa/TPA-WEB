import styles from '@/styles/Home.module.css';
import ImageSlider, { ImageType } from './imageSlider';
import { useState, useEffect } from 'react';

export default function home() {
  const [images, setImages] = useState<ImageType[]>();

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
  }, []);
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
    </div>
  );
}
