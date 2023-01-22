import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import FacultyHome from "./pages/FacultyHome";
import Results from "./pages/Results";
import NewAnnouncement from "./pages/NewAnnouncement";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/home" exact>
          <FacultyHome />
        </Route>
        <Route path="/results" exact>
          <Results />
        </Route>
        <Route path="/add-announcement" exact>
          <NewAnnouncement />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
