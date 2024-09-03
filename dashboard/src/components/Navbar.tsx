import { Link, useLocation } from 'react-router-dom';
import usePocketbase from "../hooks/usePocketbase";

interface Link {
  name: string;
  href: string;
}

const links = [
  {
    name: "Home",
    href: "/dashboard",
  },
  {
    name: "Attendance",
    href: "/dashboard/attendance",
  },
  {
    name: "Lessons",
    href: "/dashboard/lessons",
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
  },
  {
    name: "Settings",
    href: "/dashboard/settings"
  }
] as Link[];


export const Top = () => {

  const { authStore } = usePocketbase();

  return (
    <div className="flex items-center justify-between w-full border-b border-b-neutral-700 p-4">
      <div className="font-bold">
        <Link to='/' className='text-white'>CS Club Dashboard</Link>
      </div>
      <div>
        {authStore.model?.name}
      </div>
    </div>
  )
}

export const Side = () => {
  const location = useLocation();

  const { authStore } = usePocketbase();

  const handleLogout = async () => {
    authStore.clear();

    window.location.href = '/login'
  };

  return (
    <div className="!w-[20vw] p-4 flex flex-col gap-1">
      {links.map((link, index) => (
        <Link to={link.href} key={index} className={`p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all ${(location.pathname === link.href) ? "font-bold text-white bg-neutral-700 rounded-md" : ""}`}>{link.name}</Link>
      ))}
      <button className={`p-2 text-neutral-400 hover:text-white bf-transparent hover:bg-neutral-700 rounded-md transition-all text-left`} onClick={handleLogout}>Log out</button>
    </div>
  )
}