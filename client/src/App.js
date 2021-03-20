import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [medals, setMedals] = useState([]);
  // test fetch call
  // 'https://jsonplaceholder.typicode.com/posts/1'

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/v1/medals-by-games');
        if (response.ok) {
          const data = await response.json();
          console.log({ data });
          setMedals(data);
          console.log({ medals });
        }
      } catch (err) {
        console.log('error', err.message || err.statusText);
      }
    };
    getData();
  }, [medals, setMedals]);

  return (
    <div className="App">
      <h1>medals</h1>
      {/* <ul>
        {medals.map(({ year, medals, country }) => (
          <li key={country}>
            {year},{medals},{country}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;

/* shape of data for postman

{
    "year": "2022",
    "medals": 155,
    "country": "US"
}

*/
