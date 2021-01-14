import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import MainMenu from './mainComponents/menu';
import Barcode from "./Barcode";
import MainPage from "./MainPage";
import CurrentPoints from './CurrentPoints';
import BuyItems from './BuyItems';
import MyAccount from './MyAccount';
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }] = useStateValue();

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
              <MainPage />
          }
        </Route>
        <Route exact path='/myaccount'>
          {
            user == null ? <MainPage /> : <MyAccount />
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
