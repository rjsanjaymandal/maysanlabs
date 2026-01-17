import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          Maysan Labs
        </Link>

        <div className={styles.navLinks}>
          <Link href="#products" className={styles.link}>
            Products
          </Link>
          <Link href="#case-studies" className={styles.link}>
            Case Studies
          </Link>
        </div>

        <Link
          href="tel:+919660641530"
          className={`btn btn-primary ${styles.cta}`}
        >
          Call: 9660641530
        </Link>
      </div>
    </nav>
  );
}
