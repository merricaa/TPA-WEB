import styles from '@/styles/Home.module.css';
export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.footerCol1}>
        <h3>Contact Info</h3>
        <a href="#">+0812-3345-6789</a>
        <br />
        <a href="#">vorskins@gmail.com</a>
        <br />
        <a href="#">Tangerang, Indonesia - 155562</a>
      </div>
      <div className="footer-col-2">
        <h1 className="logo-1">Vorskins</h1>
        <p>Download App for Android and ios</p>
      </div>
      <div className="footer-col-3">
        <h3>Quick Links</h3>
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
      <div className="footer-col-4">
        <h3>Follow Us</h3>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
