import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './generics.css';

import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
