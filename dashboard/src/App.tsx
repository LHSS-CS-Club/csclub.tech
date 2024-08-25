import { Route, Switch } from "wouter";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import { Top, Side } from "./components/Navbar";

import usePocketbase from "./hooks/usePocketbase";

const App = () => {
  const { authStore } = usePocketbase();

  if (!authStore.isValid) {
    return (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route>404 Not Found</Route>
      </Switch>
    );
  }

  return (
    <div>
      <Top />
      <div className="flex">
        <Side />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />

          <Route>404 Not Found</Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;