import React from 'react';
import styles from './Intro.module.css';

function Intro() {
  return (
    <div className={styles.introContainer}>
      <h1 className={styles.headline}>Reasons to be cheerful </h1>
      <h2 className={styles.highlight}>Tokoyo 2021</h2>

      <p className={styles.strap}>
        Ahead of the opening ceremony, we take a look at some of the data behind
        the games
      </p>
    </div>
  );
}

export default Intro;
