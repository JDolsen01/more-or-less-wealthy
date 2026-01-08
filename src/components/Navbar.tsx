import { Link, useNavigate, useLocation } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import Icon, { type IconList } from "./Icon";

type LinksType = {
  name: string;
  path: string;
  icon: IconList;
};

interface NavbarProps {
  links: LinksType[];
}

function Navbar({ links }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm fixed z-10 ">
        <div className="navbar-start">
          <Link to="/dashboard" className="btn btn-ghost text-xl">
            More || Less Wealthy
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links.map((link) => (
              <li key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <button onClick={handleSignOut} className="btn">
            Logout
          </button>
        </div>
      </div>

      <div className="dock dock-lg lg:hidden">
        {links.map((link) => (
          <Link
            key={link.name}
            className={location.pathname === link.path ? "dock-active" : ""}
            to={link.path}
          >
            <Icon type={link.icon} />
            <span className="dock-label">{link.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Navbar;
