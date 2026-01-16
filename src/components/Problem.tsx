import styles from "./Problem.module.css";

export default function Problem() {
  const problems = [
    {
      title: "Plugin Chaos",
      text: "Wordpress and Shopify require dozens of expensive plugins just to function properly. It slows you down and costs a fortune.",
    },
    {
      title: "Hiring Headaches",
      text: "Finding reliable developers, copywriters, and marketers is a full-time job. You shouldn't have to manage a team to sell online.",
    },
    {
      title: "Data Hostage",
      text: "When you build on rented land like Shopify, they own your data and can shut you down. Own your code, own your future.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className={styles.label}>The Problem</span>
          <h2 className={styles.title}>Traditional E-commerce is Broken</h2>
          <p className={styles.description}>
            Most platforms are designed for large teams with deep pockets. For
            the solo founder, they are a trap of monthly fees and complexity.
          </p>
        </div>

        <div className={styles.grid}>
          {problems.map((prob, index) => (
            <div key={index} className={styles.card}>
              <h3 className={styles.cardTitle}>{prob.title}</h3>
              <p className={styles.cardText}>{prob.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
