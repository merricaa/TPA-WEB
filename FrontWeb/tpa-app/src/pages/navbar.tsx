import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

import axios from 'axios';
export default function Navbar() {
  const [user, setCurrentUser] = useState<any[]>([]);
  const token = getCookie('token');
  useEffect(() => {
    const currUserQuery = `query getCurrentUser{
      getCurrentUser{
        name, id,
      }
    }`;
    axios
      .post(
        'http://localhost:8080/query',
        {
          query: currUserQuery,
          // variables: variables,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        // setProducts(response.data.data.products);
        setCurrentUser(response.data.data.getCurrentUser);
      })
      .catch((error) => {
        console.log(error);
        // console.log(variables);
        console.log('test');
      });
  }, []);
  return (
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
        {/* <a href="/" className={styles.signUpBTN}>
            Sign In / Register
          </a> */}
        {/* {user.name} */}
        <div className={styles.profileBTN}>
          <img src="/Assets/user.png" alt="" className={styles.uk} />
          <div className={styles.profileName}>
            <p className={styles.userName}>Welcome</p>
            <p className={styles.userName}>{user?.name}</p>
          </div>
        </div>
      </div>
      <div className={styles.homeOrder}>
        <a href="" className={styles.return}>
          Return & Order
        </a>
      </div>
      <img src="/Assets/cart.png" alt="" className={styles.location} />
    </div>
  );
}
