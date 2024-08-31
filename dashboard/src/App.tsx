import { Routes, Route, Navigate, Link } from 'react-router-dom'

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';

import usePocketbase from "./hooks/usePocketbase";

import { Toaster } from 'sonner';

const App = () => {
  const { authStore } = usePocketbase();
  
  return (
    <div>
      <Toaster theme="dark" richColors />
      <Routes>
        {
          (authStore.isValid) ? (
            <>
              <Route index element={<Navigate to='/home' />} />
              <Route path="login" element={<Navigate to='/home' />} />
              <Route path="signup" element={<Navigate to='/home' />} />
            </>
          ) : (
            <>
              <Route index element={<Navigate to='/login' />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </>
          )
        }
        <Route path='home' element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="*" element={<><h1>404</h1><p>We couldn't find this page. <Link to='/'>Go back to safety.</Link></p></>} />
        </Route>
        <Route path="*" element={<div className='p-6'><h1>404</h1><p>We couldn't find this page. <Link to='/'>Go back to safety.</Link></p></div>} />
      </Routes>
    </div>
  );
}

export default App;