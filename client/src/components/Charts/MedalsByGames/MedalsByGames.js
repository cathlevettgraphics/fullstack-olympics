import React, { useState, useEffect, useRef } from 'react';
import { useD3 } from '../../../hooks/useD3';
import * as d3 from 'd3';

function MedalsByGames() {
  const [medals, setMedals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Get data fromm server
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/v1/medals-by-games');
        if (response.ok) {
          const data = await response.json();
          // console.log({ data });
          setMedals(data);
          setLoading(false);
          setLoaded(true);
        }
      } catch (err) {
        console.log('error', err.message || err.statusText);
      }
    };
    if (!loaded && !loading) {
      getData();
    }
  }, [medals, setMedals]);

  console.log('access outside use effect', medals);

  // draw data?

  return (
    <div>
      <h2>how have the top medaling nations performed over time?</h2>
      <p>[ charts showing US, UK, Ger, Fra, Ita medals 1976-2016]</p>
    </div>
  );
}

export default MedalsByGames;
