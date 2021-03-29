import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Intro from '../../components/Intro/Intro';
import Footer from '../../components/Footer/Footer';

// STYLES
import styles from './Home.module.css';

// SMALL MULTIPLE CHARTS
import MedalsByGamesUS from '../../components/Charts/MedalsByGames/MedalsByGamesUS';
import MedalsByGamesUK from '../../components/Charts/MedalsByGames/MedalsByGamesUK';
import MedalsByGamesGER from '../../components/Charts/MedalsByGames/MedalsByGamesGER';
import MedalsByGamesRUS from '../../components/Charts/MedalsByGames/MedalsByGamesRUS';
import MedalsByGamesFRA from '../../components/Charts/MedalsByGames/MedalsByGamesFRA';
import MedalsByGamesITA from '../../components/Charts/MedalsByGames/MedalsByGamesITA';

// ANIMATION
import Records100m from '../../components/Charts/Records100m/Records100m';

// MAP
import MedalsByCountry from '../../components/Charts/MedalsByCountry/MedalsByCountry';

// VISUAL TABLE
import MedalTable from '../../components/Charts/MedalTable/MedalTable';

// ! IMPORT LOCAL DATA FOR WORLD MAP AND GEOJSON
import data from '../../components/SeedData/medal-geo.js';
import shapes from '../../components/Charts/MapData/WorldMap/ne_50m_admin_0_countries/world-geojson.json';

// ! IMPORT LOCAL DATA FOR 100m RECORSDS
import data100m from '../../components/SeedData/100mRecords';

// IMPORT CONTEXTS
import { GetMedalByGamesContext } from '../../contexts/GetMedalByGamesContext';

function Home() {
  // USE CONTEXT FOR MEDALS BY GAMES DATA
  const { getMedalsByGamesData, medals } = useContext(GetMedalByGamesContext);
  // GET DATA FOR MEDALS BY GAMES
  useEffect(() => {
    getMedalsByGamesData();
  }, [getMedalsByGamesData]);
  // console.log('server: medals by games ', medals);

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section>
          <Intro />
        </section>

        <section className="medals-by-country">
          <MedalsByCountry data={data} shapes={shapes} />
        </section>

        <section className={styles.medalsByGames}>
          <div className={styles.introText}>
            <h2 className={styles.subhead}>
              How have the top medaling nations performed over time?
            </h2>
            <p className={styles.strap}>
              Well, the way they make shows is, they make one show. That show's
              called a pilot. Then they show that show to the people who make
              shows, and on the strength of that one show they decide if they're
              going to make more shows.
            </p>
          </div>
          <div className={styles.smallMultiples}>
            <MedalsByGamesUS data={medals} />
            <MedalsByGamesRUS data={medals} />
            <MedalsByGamesGER data={medals} />
            <MedalsByGamesUK data={medals} />
            <MedalsByGamesITA data={medals} />
            <MedalsByGamesFRA data={medals} />
          </div>
        </section>

        <section className="100m-records">
          <Records100m data={data100m} />
        </section>

        <section className="medals-table">
          <MedalTable />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
