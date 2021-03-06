import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './generics.css';
import { GetMedalByGamesProvider } from './contexts/GetMedalByGamesContext';

import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <GetMedalByGamesProvider>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </GetMedalByGamesProvider>
    </Router>
  );
}

export default App;
