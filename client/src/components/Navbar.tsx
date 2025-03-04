import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Menu, X } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const Navbar: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-red-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Droplet className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">BloodDapp</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-red-600 transition-colors">
              Home
            </Link>
            <Link to="/donors" className="px-3 py-2 rounded-md hover:bg-red-600 transition-colors">
              Donors
            </Link>
            <Link to="/register" className="px-3 py-2 rounded-md hover:bg-red-600 transition-colors">
              Register
            </Link>
            <Link to="/donate" className="px-3 py-2 rounded-md hover:bg-red-600 transition-colors">
              Donate
            </Link>
            <Link to="/history" className="px-3 py-2 rounded-md hover:bg-red-600 transition-colors">
              History
            </Link>

            {wallet.connected ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm truncate max-w-[120px]">
                  {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="bg-white text-red-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={wallet.connecting}
                className="bg-white text-red-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-70"
              >
                {wallet.connecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-red-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/donors"
              className="block px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Donors
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link
              to="/donate"
              className="block px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Donate
            </Link>
            <Link
              to="/history"
              className="block px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              History
            </Link>

            {wallet.connected ? (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <span className="text-sm truncate">
                  {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                </span>
                <button
                  onClick={() => {
                    disconnectWallet();
                    setIsMenuOpen(false);
                  }}
                  className="bg-white text-red-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors w-full"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  connectWallet();
                  setIsMenuOpen(false);
                }}
                disabled={wallet.connecting}
                className="mx-3 my-2 bg-white text-red-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-70 w-[calc(100%-24px)]"
              >
                {wallet.connecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;