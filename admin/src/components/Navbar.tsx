import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Home, Info, Phone, LogIn, UserPlus, Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { pageName: 'Home', link: '/', icon: <Home size={18} />, id: '1' },
    { pageName: 'About', link: '/about', icon: <Info size={18} />, id: '2' },
    { pageName: 'Contact', link: '/contact', icon: <Phone size={18} />, id: '3' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Left Section */}
          <div>
            <Link to="/" className="font-bold text-xl text-gray-800 hover:text-gray-600 transition">
              Izinyoka Tracker
            </Link>
          </div>

          {/* Desktop Navigation (Middle) */}
          <div className="hidden md:block">
            <ul className="flex space-x-1">
              {navigationLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.pageName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Auth Buttons (Right) */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
            >
              <LogIn size={18} className="mr-2" />
              Login
            </button>
            <button
              onClick={() => navigate('/sign-up')}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              <UserPlus size={18} className="mr-2" />
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigationLinks.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              onClick={closeMobileMenu}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
            >
              <span className="mr-3">{item.icon}</span>
              {item.pageName}
            </Link>
          ))}
          <div className="border-t border-gray-200 my-2"></div>
          <button
            onClick={() => { navigate('/login'); closeMobileMenu(); }}
            className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
          >
            <LogIn size={18} className="mr-3" />
            Login
          </button>
          <button
            onClick={() => { navigate('/sign-up'); closeMobileMenu(); }}
            className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            <UserPlus size={18} className="mr-3" />
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;