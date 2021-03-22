import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// IMPORT VISUAL ELEMENTS
import MedalsByGames from '../../components/Charts/MedalsByGames/MedalsByGames';
import Records100m from '../../components/Charts/Records100m/Records100m';
import MedalsByCountry from '../../components/Charts/MedalsByCountry/MedalsByCountry';
import MedalTable from '../../components/Charts/MedalTable/MedalTable';

// TEST CHART HOOKED UP TO SERVER
import TestChart from './../../components/Charts/MedalsByGames/TestChart';

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
    <div className="page">
      <Header />
      <main>
        <h1>reasons to be cheerful – tokoyo 2021</h1>
        <p>
          ahead of the opening ceremony, we take a look at some of the data
          behind the games
        </p>

        {/* THIS SEEMS THE SIMPLEST SET OF CHARTS */}
        <section className="medals-by-games">
          {/* <MedalsByGames /> */}
          <TestChart data={medals} />
        </section>

        <section className="100m-records">
          <Records100m />
        </section>

        <section className="medals-by-country">
          <MedalsByCountry />
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
