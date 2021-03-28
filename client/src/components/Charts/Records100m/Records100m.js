import React from 'react';
import styles from './Records100m.module.css';

function Records100m() {
  return (
    <div className={styles.recordContainer}>
      <div className={styles.introText}>
        <h2 className={styles.subhead}>
          Can usain bolts 100m record ever be beaten?
        </h2>
        <p className={styles.strap}>[ aninmated chart showing 100m records]</p>
        <p className={styles.strap}>
          Your bones don't break, mine do. That's clear. Your cells react to
          bacteria and viruses differently than mine. You don't get sick, I do.
          That's also clear. But for some reason, you and I react the exact same
          way to water.
        </p>
      </div>
      <div className={styles.placeholder}></div>
    </div>
  );
}

export default Records100m;
