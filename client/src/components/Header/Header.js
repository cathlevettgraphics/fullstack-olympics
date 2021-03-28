import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles.mainNav}>
      <span>
        <a href="#" className={styles.mainLogo}>
          faster → higher → stronger
        </a>
      </span>
    </div>
  );
}

export default Header;
