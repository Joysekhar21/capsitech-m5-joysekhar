import { useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { useNavigate } from "react-router";

const AvatarButton = () => {
  const { fetchUser, isLoggedIn, setLoginModal, setIsLoggedIn, user, setUser } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("todo-avatar");
    if (savedAvatar) setUser({ ...user, avatar: savedAvatar });
    else {
      fetchUser();
    }

    if (!isLoggedIn) {
      localStorage.removeItem("todo-avatar");
    } else {
      fetchUser();
    }
  }, [isLoggedIn]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target )) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("todo-accessToken");
    localStorage.removeItem("todo-avatar");
    setLoginModal(true);
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/")
  };

  return (
    <div className="relative z-10" ref={dropdownRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        title=""
        className="absolute lg:top-0 xl:top-0 2xl:top-0 md:top-0 mt-8 right-20 overflow-hidden rounded-full hover:ring-2 dark:hover:ring-white hover:ring-slate-950"
      >
        <img src={user.avatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-md shadow-md bg-white dark:bg-slate-950 ring-1 ring-gray-200 dark:ring-slate-200 p-1">
          <button
            onClick={() => {
              navigate("/profile")
              setMenuOpen(false);
            }}
            className="block w-full px-4 py-1 text-center rounded-md hover:bg-gray-100 hover:dark:bg-slate-800"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-1 text-center text-red-400 rounded-md hover:bg-gray-100 hover:dark:bg-slate-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarButton;
