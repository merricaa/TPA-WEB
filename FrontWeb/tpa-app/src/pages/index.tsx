import styles from '@/styles/Home.module.css';
import axios from 'axios';
import { useState } from 'react';
import { setCookies } from 'cookies-next';

export default function login() {
  const [errorMessage, setErrorMessage] = useState('');
  const query = `mutation ($email:String!, $password:String!){
    auth{
      login(email: $email, password: $password)
    }
  }`;
  const handleLogin = () => {
    // const [formValues, setFormValues] = useState({
    //   email: '',
    //   password: '',
    // });

    const variables = {
      email: (
        document.getElementById('email') as HTMLInputElement
      ).value.trim(),
      password: (document.getElementById('password') as HTMLInputElement).value,
    };

    axios
      .post('http://localhost:8080/query', {
        query: query,
        variables: variables,
      })
      .then((response) => {
        console.log(response);

        if (response.data.data.auth != null) {
          let time = 60 * 60 * 2; // 2 hours
          setCookies('token', response.data.data.auth.login.token, {
            maxAge: time,
          });
          window.location.href = '/home';
        } else {
          setErrorMessage('Credentail is not valid ');
        }
      })
      .catch((error) => {
        console.log(error);
        // console.log(variables);
        // console.log('test');
      });
  };
  return (
    <div className={styles.container1}>
      <div className={styles.formcontainer}>
        <img src="/logo.svg" alt="" className={styles.logo} />
        <h1 className={styles.title}>Sign In </h1>
        <input
          type="text"
          placeholder="email"
          className={styles.email}
          id="email"
        />
        <input
          type="password"
          placeholder="Insert Password"
          className={styles.email}
          id="password"
        />
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
        <button id={styles.signInBtn} type="submit" onClick={handleLogin}>
          SIGN IN
        </button>
        <button className={styles.oneTimeBTN}>GET ONE-TIME SIGN IN CODE</button>
        <a href="/register" className={styles.signUpBTN}>
          Didin't have account? Sign Up
        </a>
        <br />
        <h3 className={styles.orTitle}>OR</h3>
        <button className={styles.googleBTN}>SIGN IN WITH GOOGLE</button>
        <button className={styles.appleBTN}>SIGN IN WITH APPLE</button>
      </div>
    </div>
  );
}
