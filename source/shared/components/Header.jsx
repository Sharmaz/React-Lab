import React from 'react';
import { Link } from 'react-router';
import styles from './Header.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Experimento con React
      </h1>


      <nav role="navigation" className={styles.navigation}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <a
          className={styles.link}
          href="http://fapdevs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fapdevs
        </a>
      </nav>

    </header>
  );
}

export default Header;
