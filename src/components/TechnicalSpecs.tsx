import styles from "./TechnicalSpecs.module.css";

export default function TechnicalSpecs() {
  const specs = [
    {
      title: "MERN Stack",
      text: "React, Node.js, Express, MongoDB. Industry standard.",
    },
    {
      title: "Next.js 14",
      text: "Server-side rendering for elite SEO performance.",
    },
    { title: "Secure Payments", text: "Integrated with Stripe & Razorpay." },
    {
      title: "Mobile Optimized",
      text: "Responsive design that works on any device.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Under the Hood</h2>
          <p style={{ color: "#94a3b8" }}>Built for scale. Owned by you.</p>
        </div>

        <div className={styles.grid}>
          {specs.map((spec, index) => (
            <div key={index} className={styles.card}>
              <h3 className={styles.cardTitle}>{spec.title}</h3>
              <p className={styles.cardText}>{spec.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
