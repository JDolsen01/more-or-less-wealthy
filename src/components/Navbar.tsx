import { Link, useNavigate, useLocation } from "react-router-dom";
import supabase from "../helper/supabaseClient";

type LinksType = {
  name: string;
  path: string;
  svgChildren: React.ReactElement;
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
      <div className="navbar bg-base-100 shadow-sm">
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
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {
                "<!-- Icon from Myna UI Icons by Praveen Juge - https://github.com/praveenjuge/mynaui-icons/blob/main/LICENSE -->"
              }
              {link.svgChildren}
            </svg>
            <span className="dock-label">{link.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Navbar;
