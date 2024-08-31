import { Link, useLocation } from 'wouter';
import usePocketbase from "../hooks/usePocketbase";
import { toast } from 'sonner'

interface Link {
  name: string;
  href: string;
}

const links = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Settings",
    href: "/settings",
  },
] as Link[];


export const Top = () => {
  return (
    <div className="flex items-center justify-between w-full border-b border-b-neutral-700 p-4">
      <div className="font-bold">
        CS Club Dashboard
      </div>
      <div>

      </div>
    </div>
  )
}

export const Side = () => {
  const [location] = useLocation();

  const pocketbase = usePocketbase();

  const handleLogout = async () => {
    pocketbase.authStore.clear();
    // Redirect to login page or home page after logout
    window.location.href = '/login'; // or wherever you want to redirect
    
    toast.success("joe")
  };

  return (
    <div className="w-[16rem] p-4 flex flex-col">
      {links.map((link, index) => (
        <Link to={link.href} key={index} className={`p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all ${(location === link.href) ? "font-bold text-white bg-neutral-700 rounded-md" : ""}`}>{link.name}</Link>
      ))}
      <button className={`p-2 text-neutral-400 hover:text-white bf-transparent hover:bg-neutral-700 rounded-md transition-all text-left`} onClick={handleLogout}>Log out</button>
    </div>
  )
}