import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <span className={styles.badge}>One-Person Empire E-commerce Stack</span>

        <h1 className={styles.headline}>
          Don&apos;t Just Build a Store.
          <br />
          <span className="text-gradient">Build an Automated Business.</span>
        </h1>

        <p className={styles.subheadline}>
          The complete e-commerce technology stack designed for the solo
          entrepreneur. Proven by real brands, powered by AI.
        </p>

        <div className={styles.ctaGroup}>
          <Link href="#contact" className="btn btn-primary">
            Start Your Project
          </Link>
          <Link href="#solution" className={`btn ${styles.secondaryBtn}`}>
            View The Stack
          </Link>
        </div>
      </div>
    </section>
  );
}
