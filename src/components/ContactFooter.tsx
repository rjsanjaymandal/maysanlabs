import Link from "next/link";

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      style={{ padding: "6rem 0 3rem", background: "var(--background)" }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
          Stop renting your technology.
          <br />
          <span className="text-gradient">Start owning it.</span>
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: "2.5rem" }}>
          We build it, set it up, and hand you the keys. The empire is yours.
        </p>

        <Link
          href="tel:+919660641530"
          className="btn btn-primary"
          style={{ fontSize: "1.2rem", padding: "1rem 2rem" }}
        >
          Book a Call: +91 9660641530
        </Link>

        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            color: "var(--muted)",
            fontSize: "0.9rem",
          }}
        >
          <p>
            © {new Date().getFullYear()} CB Web Solution. All rights reserved.
          </p>
          <p>Location: India | Email: contact@cbwebsolution.com</p>
        </div>
      </div>
    </footer>
  );
}
