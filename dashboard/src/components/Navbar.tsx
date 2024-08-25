import { Link, useLocation } from 'wouter';

interface Link {
  name: string;
  href: string;
}

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Settings",
    href: "/settings",
  },
  {
    name: "Logout",
    href: "/logout",
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

  return (
    <div className="w-[16rem] p-4 flex flex-col">
      {links.map((link) => (
        <Link to={link.href} className={`p-2 text-neutral-400 ${(location === link.href) ? "font-bold text-white bg-neutral-700 rounded-md transition-all" : ""}`}>{link.name}</Link>
      ))}
    </div>
  )
}