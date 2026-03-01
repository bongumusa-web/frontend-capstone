import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userUserStore } from "../Store/userStore";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { currentUser, logout } = userUserStore();

  const handleLogout = () => {
    logout();
    alert("You have logged out!");
    navigate("/");
  };

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl md:text-xl lg:text-3xlfont-semibold">
            Musa's Salon
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 text-lg  md:text-base md:font-medium md:items-center md:justify-center ">
            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="/haircut" className="hover:text-gray-400">HairCut</Link>
            <Link to="/nail" className="hover:text-gray-400">Nail Service</Link>
            <Link to="/treatment" className="hover:text-gray-400">Hair Treatment</Link>
            <Link to="/history" className="hover:text-gray-400">Booking History</Link>
            <Link to="/about" className="hover:text-gray-400">About Us</Link>

            {currentUser ? (
              <>
                <span className="font-semibold">{currentUser.username}</span>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-gray-400">Login</Link>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-4 flex justify-end border-b border-gray-700">
          <button onClick={() => setIsOpen(false)}>❌</button>
        </div>

        <div className="flex flex-col space-y-4 p-6 text-lg">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-gray-400">Home</Link>
          <Link to="/haircut" onClick={() => setIsOpen(false)} className="hover:text-gray-400">HairCut</Link>
          <Link to="/nail" onClick={() => setIsOpen(false)} className="hover:text-gray-400">Nail Service</Link>
          <Link to="/treatment" onClick={() => setIsOpen(false)} className="hover:text-gray-400">Hair Treatment</Link>
          <Link to="/history" onClick={() => setIsOpen(false)} className="hover:text-gray-400">Booking History</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-400">About Us</Link>

          {currentUser ? (
            <>
              <span className="font-semibold">{currentUser.username}</span>
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="hover:text-gray-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-gray-400">Login</Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
        ></div>
      )}
    </nav>
  );
}

export default Navbar;