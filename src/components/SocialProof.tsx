import styles from "./SocialProof.module.css";

export default function SocialProof() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Trusted by Modern Brands</h2>
        <span className={styles.brand}>FLASH</span>

        <div className={styles.grid}>
          <div className={styles.item}>
            <span className={styles.stat}>100%</span>
            <p>Data Ownership</p>
          </div>
          <div className={styles.item}>
            <span className={styles.stat}>1x</span>
            <p>One-Time Setup Fee</p>
          </div>
          <div className={styles.item}>
            <span className={styles.stat}>1</span>
            <p>Person Needed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
