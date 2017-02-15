import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import styles from './Header.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <FormattedMessage id="title" />
      </h1>


      <nav role="navigation" className={styles.navigation}>
        <Link to="/" className={styles.link}>
          <FormattedMessage id="title.home" />
        </Link>
        <a
          className={styles.link}
          href="http://fapdevs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="header.nav.fapdevs" />
        </a>
      </nav>

    </header>
  );
}

export default Header;
