import { Outlet, Link } from 'react-router-dom'
import { Top, Side } from "../components/Navbar";
import usePocketbase from "../hooks/usePocketbase";

const Dashboard = () => {

  const { authStore } = usePocketbase();
  
  return (
    <div>
      <Top />
      <div className='flex flex-col md:flex-row'>
        <Side />
        {(authStore.isValid) ? 
          <div className='p-6 w-screen md:w-[75vw]'>
            <Outlet />
          </div>
          : 
          <div className='p-6 w-screen md:w-[75vw]'>
            <h1>You are not logged in!</h1>
            <p>Log in <Link to='/login'>here.</Link></p>
          </div>
        }
      </div>
    </div>
  )
}

export default Dashboard