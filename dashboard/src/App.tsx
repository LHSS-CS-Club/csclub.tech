import { Route, Switch } from "wouter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => (
  <>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />

      <Route>404 Not Found</Route>
    </Switch>
  </>
);

export default App;