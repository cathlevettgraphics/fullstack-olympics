import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MedalsByGames from '../../components/Charts/MedalsByGames/MedalsByGames';
import Records100m from '../../components/Charts/Records100m/Records100m';
import MedalsByCountry from '../../components/Charts/MedalsByCountry/MedalsByCountry';
import MedalTable from '../../components/Charts/MedalTable/MedalTable';

function Home() {
  return (
    <div className="page">
      <Header />
      <main>
        <h1>reasons to be cheerful – tokoyo 2021</h1>
        <p>
          ahead of the opening ceremony, we take a look at some of the data
          behind the games
        </p>

        <section className="medals-by-games">
          <MedalsByGames />
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
