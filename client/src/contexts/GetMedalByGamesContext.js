import { createContext, useState } from 'react';

// Create context
export const GetMedalByGamesContext = createContext({
  getMedalsByGamesData: () => [],
  loaded: false,
  loading: false,
  error: null,
  medals: [],
});

export const GetMedalByGamesProvider = (props) => {
  const [medals, setMedals] = useState(() => {
    return JSON.parse(localStorage.getItem('medalsByGames')) || [];
  });

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Use effect from TestChart.js
  const getMedalsByGamesData = async () => {
    if (loading || loaded || error) {
      return;
    } else {
      setLoading(true);
    }
    try {
      const response = await fetch('/api/v1/medals-by-games');
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem('medals', JSON.stringify(data));
      setMedals(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  return (
    <GetMedalByGamesContext.Provider
      value={{
        medals,
        loading,
        error,
        getMedalsByGamesData,
      }}
    >
      {props.children}
    </GetMedalByGamesContext.Provider>
  );
};
