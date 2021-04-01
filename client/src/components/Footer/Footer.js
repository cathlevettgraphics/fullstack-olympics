import React from 'react';
import styles from './Footer.module.css';

function Foter() {
  return (
    <div className={styles.mainNav}>
      <span>
        <a href="#" className={styles.mainLogo}>
          faster → higher → stronger
        </a>
      </span>
      <span>
        <a href="http://cathlevett.com/" className={styles.brandLogo}>
          cath levett graphics
        </a>
      </span>
    </div>
  );
}

export default Foter;
