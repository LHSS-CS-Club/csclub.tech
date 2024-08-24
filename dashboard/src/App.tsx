import { Route, Switch } from "wouter";
import usePocketbase from "./hooks/usePocketbase";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const App = () => {
  const { authStore } = usePocketbase();

  if (!authStore.isValid) {
    return (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route component={Login} />
      </Switch>
    );
  }

  return (
    <>
      <Switch>
        <Route path="/home" component={Home} />

        <Route>404 Not Found</Route>
      </Switch>
    </>
  );
}

export default App;