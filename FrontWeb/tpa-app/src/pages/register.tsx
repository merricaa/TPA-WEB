import styles from '@/styles/Home.module.css';
import axios from 'axios';
import { useState } from 'react';

const query = `mutation($name:String!, $email:String!, $phone:String!, $password:String!,$banned:Boolean!, $role:UserRole!){
  createUser(input:{
    name: $name,
    email: $email,
    phone: $phone,
    password:$password,
    banned:$banned,
    role: $role
  }){
    id
  }
}`;

export default function register() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // const handleInputChange = () => {
  //   setFormValues(target.value);
  // };
  // const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormValues(event.target.value);
  // };

  // document.getElementById('password') HTM;

  const handleSubmit = () => {
    var validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var validPhone = /^\d{10}$/;
    var validPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

    if (
      (document.getElementById('first') as HTMLInputElement).value.trim() == ''
    ) {
      console.log('error');
      setErrorMessage('First name must be filled!');
    } else if (
      (document.getElementById('last') as HTMLInputElement).value.trim() == ''
    ) {
      setErrorMessage('Last name field must be filled!');
    } else if (
      (document.getElementById('email') as HTMLInputElement).value.trim() == ''
    ) {
      setErrorMessage('Email must be filled!');
    } else if (
      (document.getElementById('phone') as HTMLInputElement).value.trim() == ''
    ) {
      setErrorMessage('Phone must be filled');
    } else if (
      (document.getElementById('password') as HTMLInputElement).value.trim() ==
      ''
    ) {
      setErrorMessage('Password must be filled');
    } else if (
      !(document.getElementById('email') as HTMLInputElement).value.match(
        validEmail,
      )
    ) {
      setErrorMessage('Email is not valid');
      console.log('email is not valid');
    } else if (
      !(document.getElementById('phone') as HTMLInputElement).value.match(
        validPhone,
      )
    ) {
      setErrorMessage('Phone is number is not valid');
    } else if (
      !(document.getElementById('password') as HTMLInputElement).value.match(
        validPassword,
      )
    ) {
      setErrorMessage(
        'Password must contain at least 1 special character, uppercase and lowercase and number',
      );
    } else {
      console.log('Test');
      setErrorMessage('');
      window.location.href = '/';

      const variables = {
        name:
          (document.getElementById('first') as HTMLInputElement).value.trim() +
          ' ' +
          (document.getElementById('last') as HTMLInputElement).value.trim(),
        email: (
          document.getElementById('email') as HTMLInputElement
        ).value.trim(),
        phone: (
          document.getElementById('phone') as HTMLInputElement
        ).value.trim(),
        password: (document.getElementById('password') as HTMLInputElement)
          .value,
        banned: false,
        role: 'USER',
      };

      axios
        .post('http://localhost:8080/query', {
          query: query,
          variables: variables,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);

          console.log('test');
        });
    }
  };

  return (
    <div className={styles.container1}>
      <div className={styles.registerform}>
        <img src="/logo.svg" alt="" className={styles.logo} />
        <h1 className={styles.title}>Register</h1>
        <input
          type="text"
          className={styles.firstName}
          placeholder="Input First Name here"
          id="first"
        />
        <input
          type="text"
          className={styles.lastName}
          placeholder="Input your last name here"
          id="last"
        />
        <input
          type="text"
          name=""
          id="email"
          className={styles.email}
          placeholder="Input your email here"
        />
        <input
          type="text"
          id="phone"
          placeholder="mobile phone"
          className={styles.mobile}
        />
        <input
          type="password"
          name=""
          id="password"
          placeholder="password"
          className={styles.pass}
        />
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
        <button
          type="submit"
          className={styles.regisBTN}
          onClick={handleSubmit}
        >
          Create Account
        </button>
        <label htmlFor="" className={styles.checkContainer}>
          <input type="checkbox" className={styles.checkbox} />
          <span className={styles.checkboxTitle}>
            Subscribe for exclusive e-mail offers and discounts
          </span>
        </label>
        <label htmlFor="" className={styles.accountLbl}>
          Have Account?
          <a href="/" className={styles.SignInBTN}>
            Sign In
          </a>
        </label>
      </div>
    </div>
  );
}
