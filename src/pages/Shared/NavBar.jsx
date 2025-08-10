import React, { use, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/Logo/logo.PNG";
import Swal from "sweetalert2";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const NavBar = () => {
  const { user, userSignOut } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "synthwave") {
      root.classList.add("synthwave");
    } else {
      root.classList.remove("synthwave");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = (e) => {
    setTheme(e.target.checked ? "synthwave" : "light");
  };

  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign Out Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "font-bold text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-200"
              : "text-gray-700 hover:text-blue-500 transition-all duration-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bookshelf"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "font-bold text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-200"
              : "text-gray-700 hover:text-blue-500 transition-all duration-200"
          }
        >
          BookShelf
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutus"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "font-bold text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-200"
              : "text-gray-700 hover:text-blue-500 transition-all duration-200"
          }
        >
          About US
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contactus"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "font-bold text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-200"
              : "text-gray-700 hover:text-blue-500 transition-all duration-200"
          }
        >
          Contact
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink
              to="/addbooks"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-200"
                  : "text-gray-700 hover:text-blue-500 transition-all duration-200"
              }
            >
              Add Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mybooks"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-200"
                  : "text-gray-700 hover:text-blue-500 transition-all duration-200"
              }
            >
              My Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myprofile"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-200"
                  : "text-[#382110] hover:text-blue-500 transition-all duration-200"
              }
            >
              My Profile
            </NavLink>
          </li>
        </>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 z-50 w-full navbar bg-gradient-to-r from-yellow-100 to-pink-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost lg:hidden text-xl"
          >
            {menuOpen ? <RxCross2 /> : <GiHamburgerMenu />}
          </button>

          {menuOpen && (
            <ul
              className="menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow"
              style={{
                backgroundColor: "var(--menu-bg)",
                color: "var(--menu-text)",
              }}
            >
              {links}
            </ul>
          )}
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-sm md:text-xl font-bold flex justify-center items-center gap-2"
        >
          <img
            src={logo}
            alt="BookShelf Logo"
            className="w-12 h-10 rounded-full hidden md:flex"
          />
          <span className="text-black">
            Book<span className="text-yellow-500">SHELF</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-3">
        {user?.photoURL && (
          <img
            src={user.photoURL}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover"
            alt="User Avatar"
          />
        )}

        {/* Theme toggle */}
        <label className="flex cursor-pointer gap-2 items-center ml-2">
          <svg
            className="hidden md:flex text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            className="toggle theme-controller"
            checked={theme === "synthwave"}
            onChange={handleThemeToggle}
          />
          <svg
            className="hidden md:flex text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        {user ? (
          <button
            onClick={handleSignOut}
            className="btn bg-blue-500 hover:bg-blue-600"
          >
            Sign Out
          </button>
        ) : (
          <>
            <NavLink
              className="btn bg-blue-500 hover:bg-blue-600"
              to="/auth/register"
            >
              Register
            </NavLink>
            <NavLink
              className="btn bg-blue-500 hover:bg-blue-600"
              to="/auth/login"
            >
              Signin
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
