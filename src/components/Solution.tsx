import styles from "./Solution.module.css";

export default function Solution() {
  return (
    <section id="solution" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Our Solution</span>
          <h2 className={styles.title}>
            The &quot;One-Person Empire&quot; Stack
          </h2>
          <p style={{ color: "var(--muted)" }}>
            Everything you need to run a massive brand, alone.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.featureBlock}>
            <h3 className={styles.featureTitle}>The Pro Storefront</h3>
            <p>A lightning-fast, custom MERN-based e-commerce platform.</p>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>Next.js for superior SEO</li>
              <li className={styles.featureItem}>
                Admin Panel + Customer Store
              </li>
              <li className={styles.featureItem}>
                Secure Payments (Stripe/Razorpay)
              </li>
              <li className={styles.featureItem}>Mobile Optimized</li>
            </ul>
          </div>

          <div className={styles.featureBlock}>
            <h3 className={styles.featureTitle}>The AI Advantage</h3>
            <p>Your digital workforce. AI tools that manage your business.</p>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <strong>AI Product Lister:</strong> Upload a photo, get a
                description instantly.
              </li>
              <li className={styles.featureItem}>
                <strong>Review Automator:</strong> Auto-collect and manage
                social proof.
              </li>
              <li className={styles.featureItem}>
                <strong>Competitor Watch:</strong> Get alerts when rivals lower
                prices.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
