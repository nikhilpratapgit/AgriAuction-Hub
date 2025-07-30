import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { persistor } from '../store/store';
import { clearAuthUser } from '../store/authSlice';
import { Bell, UserCircle, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL;
const Navbar = ({ toggleTheme, darkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  // const [darkMode, setDarkMode] = useState(false);
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState('en');
  console.log(user)
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/users/logout`);
      persistor.purge();
      dispatch(clearAuthUser());
      toast.success(res.data.message);
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  // const toggleTheme = () => setDarkMode(!darkMode);
  // const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  const toggleLanguage = () => {
  const newLang = language === 'en' ? 'hi' : 'en';
  setLanguage(newLang);
  i18n.changeLanguage(newLang);
  localStorage.setItem('lang', newLang); // optional: save preference
};


  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="bg-green-600 text-white shadow-md  dark:bg-gray-800 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold">{t("logo")}</Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="block px-3 py-2 rounded-md hover:bg-green-600">{t("navbar.hoome")}</Link>
            <Link to="/auctions" className="hover:text-green-200">{t("navbar.auctions")}</Link>
            <Link to="/dashboard" className="hover:text-green-100">{t("navbar.dashboard")}</Link>
            <Link to="/create" className="hover:text-green-200">{t("navbar.createAuction")}</Link>
            <Link to="/history" className="hover:text-green-200">{t("navbar.history")}</Link>

            <button onClick={toggleTheme} className="hover:text-yellow-400">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button onClick={toggleLanguage} className="hover:text-blue-300 text-sm">
              {language === 'en' ? 'हिन्दी' : 'English'}
            </button>

            <Bell className="hover:text-orange-300 cursor-pointer" />

            {user ? (
              <>
                <button
                  onClick={handleProfileClick}
                  className="hover:text-green-200 focus:outline-none"
                  title="Profile"
                  aria-label="Profile"
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover border border-green-500"
                    />
                  ) : (
                    <UserCircle size={28} />
                  )}
                </button>
                <button
                  onClick={logoutHandler}
                  className="hover:text-red-500 font-medium"
                  title="Logout"
                >
                  {t("navbar.logout")}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-200">{t("navbar.login")}</Link>
                <Link to="/register" className="hover:text-green-200">{t("navbar.register")}</Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700 ">
          <Link to="/" className="block px-3 py-2 rounded-md hover:bg-green-600">{t("navbar.hoome")}</Link>
          <Link to="/auctions" className="block px-3 py-2 rounded-md hover:bg-green-600">{t("navbar.auctions")}</Link>
          <Link to="/create" className="block px-3 py-2 rounded-md hover:bg-green-600">{t("navbar.createAuction")}</Link>
          <Link to="/history" className="block px-3 py-2 rounded-md hover:bg-green-600">{t("navbar.history")}</Link>
          {user ? (
            <>
              <div className="flex items-center space-x-4 px-3 py-2">
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border border-green-500"
                  />
                ) : (
                  <UserCircle size={28} />
                )}
                <span>{user.username}</span>
              </div>

              <button onClick={toggleTheme} className="block px-3 py-2 hover:bg-green-600 w-full text-left">
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>

              <button onClick={toggleLanguage} className="block px-3 py-2 hover:bg-green-600 w-full text-left">
                {language === 'en' ? 'Switch to हिन्दी' : 'Switch to English'}
              </button>

              <div className="px-3 py-2">
                <Bell className="hover:text-orange-300 cursor-pointer" />
              </div>

              <Link to="/profile" className="block px-3 py-2 hover:bg-green-600">{t("navbar.profile")}</Link>
              <button onClick={logoutHandler} className="block w-full text-left px-3 py-2 hover:bg-red-600">{t("logout")}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 hover:bg-green-600">{t("navbar.login")}</Link>
              <Link to="/register" className="block px-3 py-2 hover:bg-green-600">{t("navbar.register")}</Link>
            </>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;


