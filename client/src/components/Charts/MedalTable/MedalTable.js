import React from 'react';
import styles from './MedalTable.module.css';

function MedalTable() {
  return (
    <div className={styles.medalContainer}>
      <div className={styles.introText}>
        <h2 className={styles.subhead}>all time medal table</h2>
        <p className={styles.strap}>
          [ table with proportional circles showing gold, silver bronze medals]
        </p>
        <p className={styles.strap}>
          We swallow it too fast, we choke. We get some in our lungs, we drown.
          However unreal it may seem, we are connected, you and I. We're on the
          same curve, just on opposite ends.
        </p>
      </div>
      <div className={styles.placeholder}></div>
    </div>
  );
}

export default MedalTable;
