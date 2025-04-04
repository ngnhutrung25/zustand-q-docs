import Layout from "@theme/Layout";

import styles from "./index.module.css";
import Link from "@docusaurus/Link";

export default function Home() {
  return (
    <Layout
      title="Zustand Q"
      description="A lightweight state management library with async superpowers"
    >
      <div className={styles.hero}>
        <img
          src="/img/zustand-q.webp"
          alt="Zustand Q Logo"
          className={styles.logo}
        />
        <div>
          <h1 style={{ fontSize: 48 }}>Zustand Q</h1>
          <p style={{ width: 300, fontSize: 18 }}>
            A lightweight state management library with async superpowers
          </p>
          <Link
            style={{
              background: "#c6aad4",
              color: "black",
              padding: "8px 12px",
              borderRadius: 24,
            }}
            className={styles.button}
            to="/docs/introduction"
          >
            Get Started
          </Link>
        </div>
      </div>
    </Layout>
  );
}
