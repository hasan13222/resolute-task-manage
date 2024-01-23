import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const NavItems = () => (
  <>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/about">About Us</a>
    </li>
    <li>
      <a href="/contact">Contact Us</a>
    </li>    
    <li>
      <a href="/allTasks">Tasks</a>
    </li>
    <li>
      <a href="/assignTasks">Assigned Tasks</a>
    </li>
    <li>
      <a href="/dashboard">Dashboard</a>
    </li>

  </>
);
const Header = () => {

  const {user, handleSignOut} = useContext(AuthContext);

  return (
    <>
      <div className="container-fluid shadow-sm bg-purple-50">
        <div className="container mx-auto">
          <div className="navbar bg-purple-50">
            <div className="navbar-start w-auto">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <NavItems />
                </ul>
              </div>
              <a className="hover:cursor-pointer" href="/">
                <img
                  className="max-w-24 object-contain w-full h-full"
                  src="/swarm_logo.png"
                  alt="logo"
                />
              </a>
            </div>
            <div className="navbar-start hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <NavItems />
              </ul>
            </div>
            <div className="navbar-end">
              {!user && <>
                <a href="/signup" className="btn text-white bg-indigo-600">SignUp</a>
              <a href="/login" className="btn text-white bg-indigo-600 ml-1">Login</a>
              </>}
              {user && <button className="btn bg-indigo-600 text-white" onClick={handleSignOut}>Logout</button>} 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
