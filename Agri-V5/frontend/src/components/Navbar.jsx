import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { getToken, removeToken } from "../utils/auth";
import farmBg from "../components/bg-image/image5.jpeg";

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl px-6 py-2.5 rounded-full backdrop-blur-md border ${
        isScrolled
          ? "shadow-md border-white/30 bg-white/30"
          : "border-transparent"
      } transition-all duration-300 flex justify-between items-center text-black`}
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src={farmBg}
          alt="Logo"
          className="h-9 w-9 rounded-full border border-white shadow-md object-cover"
        />
        <span className="text-xl font-bold tracking-wide">🌾 SmartFarm</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-base font-medium">
        <Link to="/about" className="hover:text-yellow-500 transition">About</Link>
        {!token ? (
          <>
            <Link to="/login" className="hover:text-yellow-500 transition">Login</Link>
            <Link to="/register" className="hover:text-yellow-500 transition">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 hover:text-yellow-500 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-white text-black rounded-xl shadow-lg p-4 w-52 z-40 flex flex-col gap-3">
          
          <Link to="/about" onClick={toggleMobileMenu} className="hover:text-yellow-500">About</Link>
          {!token ? (
            <>
              <Link to="/login" onClick={toggleMobileMenu} className="hover:text-yellow-500">Login</Link>
              <Link to="/register" onClick={toggleMobileMenu} className="hover:text-yellow-500">Register</Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
              className="hover:text-yellow-500 flex items-center gap-1"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
