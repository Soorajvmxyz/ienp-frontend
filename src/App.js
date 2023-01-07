import { Route, Switch } from "react-router-dom";
import AuthNavigation from "./components/Layout/AuthNavigation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <AuthNavigation />
      <Switch>
      <Route path='/' exact><Login /></Route>
      <Route path='/signup'><Signup /></Route>
      </Switch>
    </div>
  );
}

export default App;
