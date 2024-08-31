import { Routes, Route, Navigate } from 'react-router-dom'

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import { Top, Side } from "./components/Navbar";

import usePocketbase from "./hooks/usePocketbase";

import { Toaster } from 'sonner';

const App = () => {
  const { authStore } = usePocketbase();

  return (
    <div>
      <Toaster />
      <Routes>
        <Route index element = {(authStore.isValid === null) ? <Navigate to='/login' /> : <Navigate to='/home' />} />
        <Route path="login" element={(authStore.isValid === null) ? <Login /> : <Navigate to='/home' />} />
        <Route path="signup" element={(authStore.isValid === null) ? <Signup /> : <Navigate to='/home' />} />
        <Route path='home' element={<>
          <Top />
          <Side />
        </>}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<>404 not found</>} />
      </Routes>
    </div>
  );
}

export default App;