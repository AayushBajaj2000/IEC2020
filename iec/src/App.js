import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import MainMenu from './mainComponents/menu';
import Barcode from "./Barcode";
import CurrentPoints from './CurrentPoints';
import BuyItems from './BuyItems';
import MyAccount from './MyAccount';
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user, credit, points }, dispatch] = useStateValue();

  return (
    <Router>
      <MainMenu />
      <Switch>
        <Route exact path='/'>
          {
            user !== null ?
              <div style={{
                backgroundImage: `url(uoit.png)`
              }}>
                <Barcode />
                <CurrentPoints />
                <BuyItems />
              </div>
              :
              <p>Welcome to UOIT contactless payments please login or sign up to start</p>

          }

        </Route>
        <Route exact path='/myaccount'>
          {
            user == null ? <p>Welcome to UOIT contactless payments please login or sign up to start</p> : <MyAccount />
          }
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
