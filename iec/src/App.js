import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import MainMenu from './mainComponents/menu';
import { Hey, Bye } from './pages'; 

function App() {
  return (
    <Router>
      <MainMenu />
      <Switch>
        <Route exact path='/wow'>
          <Hey/>
        </Route>
        <Route exact path='/'>
          <Bye/>
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
