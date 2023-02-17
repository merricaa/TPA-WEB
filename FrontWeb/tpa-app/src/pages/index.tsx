import styles from '@/styles/Home.module.css';

export default function login() {
  return (
    <div className={styles.container1}>
      <div className={styles.formcontainer}>
        <h1 className={styles.title}>Sign In </h1>
        <img src="" alt="" />
        <input type="text" placeholder="email" className={styles.email} />

        <button
          id={styles.signInBtn}
          type="submit"
          onClick={() => (window.location.href = '/home')}
        >
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
