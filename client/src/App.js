// import React, { useState, useEffect } from 'react';
import MedalsByGames from './components/Charts/MedalsByGames/MedalsByGames';
import data from './components/LocalData/medals-by-games';
import './generics.css';

function App() {
  // const [medals, setMedals] = useState([]);
  // test fetch call
  // 'https://jsonplaceholder.typicode.com/posts/1'
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await fetch('/api/v1/medals-by-games');
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log({ data });
  //         setMedals(data);
  //         console.log({ medals });
  //       }
  //     } catch (err) {
  //       console.log('error', err.message || err.statusText);
  //     }
  //   };
  //   getData();
  // }, [medals, setMedals]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>US medals by summer games</h1>
        <MedalsByGames data={data} />
        <p>source: xxxxx</p>
      </header>
    </div>
  );
}

export default App;
