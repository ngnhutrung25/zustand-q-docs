import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

export default function Home() {
  return (
    <Layout
      title="Zustand Q"
      description="A lightweight state management library with async superpowers"
    >
      <div className={styles.hero}>
        <div className={styles.content}>
          <img
            src="/img/zustand-q.webp"
            alt="Zustand Q Logo"
            className={styles.logo}
          />
          <div className={styles.text}>
            <h1 className={styles.title}>Zustand Q</h1>
            <p className={styles.description}>
              A lightweight state management library with{" "}
              <span className={styles.highlight}>async superpowers</span>
            </p>
            <Link to="/docs/introduction" className={styles.gradientButton}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
