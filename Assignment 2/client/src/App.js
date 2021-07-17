import {
  Route,
  NavLink,
  HashRouter,
  Redirect,
  useHistory,
} from "react-router-dom";
import Home from "./Component/Home";
import Profile from "./Component/Profile";
import Login from "./Component/Login";
import Register from "./Component/Register";

function App() {
  return (
    <HashRouter>
      <div className="content">
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/login"
          component={() => <Login type={1} addProfile={addProfile} />}
        />
        <Route
          exact
          path="/register"
          component={() => <Login type={2} addProfile={addProfile} />}
        />
        {profile !== "" && <Route exact path="/profile" component={Register} />}
      </div>
    </HashRouter>
  );
}

export default App;
