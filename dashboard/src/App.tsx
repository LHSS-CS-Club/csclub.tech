import { Routes, Route, Navigate, Link } from 'react-router-dom'

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Settings from './pages/Settings';
import Lessons from './pages/Lessons';
import Projects from './pages/Projects';

import usePocketbase from "./hooks/usePocketbase";

import { Toaster } from 'sonner';

const App = () => {
  const { authStore } = usePocketbase();
  
  return (
    <div>
      <Toaster theme="dark" richColors />
      <Routes>
        <Route index element={(authStore.isValid) ? <Navigate to='/dashboard' /> : <Navigate to='/login' />} />
        <Route path="login" element={(authStore.isValid) ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path="signup" element={(authStore.isValid) ? <Navigate to='/dashboard' /> : <Signup />} />
        <Route path='dashboard' element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path='attendance' element={<Attendance />} />
          <Route path='lessons' element={<Lessons />} />
          <Route path='projects' element={<Projects />} />
          <Route path='settings' element={<Settings />} />
          <Route path="*" element={<><h1>404</h1><p>We couldn't find this page. <Link to='/'>Go back to safety.</Link></p></>} />
        </Route>
        <Route path="*" element={<div className='p-6'><h1>404</h1><p>We couldn't find this page. <Link to='/'>Go back to safety.</Link></p></div>} />
      </Routes>
    </div>
  );
}

export default App;