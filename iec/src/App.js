import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import MainMenu from './mainComponents/menu';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <MainMenu />
        </Route>
        <Route path='/:x' exact>
          <div>
            <p>404 Page not found</p>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
