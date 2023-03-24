import styles from '@/styles/Home.module.css';
export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles['footer-col-3']}>
        <h3>CUSTOMER SERVICE</h3>
        <ul>
          <li>
            <a href="home.html">Home</a>
          </li>
          <li>
            <a href="./about.html">About</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="./promotions.html">Promotions</a>
          </li>
          <li>
            <a href="./subscribe.html">Subscribe</a>
          </li>
        </ul>
      </div>
      <div className={styles['footer-col-3']}>
        <h3>MY ACCOUNT</h3>
        <ul>
          <li>
            <a href="home.html">Home</a>
          </li>
          <li>
            <a href="./about.html">About</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="./promotions.html">Promotions</a>
          </li>
          <li>
            <a href="./subscribe.html">Subscribe</a>
          </li>
        </ul>
      </div>
      <div className={styles['footer-col-3']}>
        <h3>COMPANY INFORMATION</h3>
        <ul>
          <li>
            <a href="home.html">Home</a>
          </li>
          <li>
            <a href="./about.html">About</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="./promotions.html">Promotions</a>
          </li>
          <li>
            <a href="./subscribe.html">Subscribe</a>
          </li>
        </ul>
      </div>
      <div className={styles['footer-col-4']}>
        <h3>SHOP OUR BRAND</h3>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/cart">Cart</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="./promotions.html">Promotions</a>
          </li>
          <li>
            <a href="./subscribe.html">Subscribe</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
