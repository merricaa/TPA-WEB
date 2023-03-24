import styles from '@/styles/Home.module.css';
import Footer from './footer';
import Navbar from './navbar';

export default function whistlist() {
  return (
    <div>
      <div className={styles.container}>
        <Navbar />

        <Footer/>

      </div>
    </div>
  );
}
