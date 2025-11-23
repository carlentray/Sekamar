import { Link, useNavigate } from 'react-router-dom';
import { Home, PlusSquare, LogOut, LogIn, User } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          🏠 Sekamar
        </Link>

        <div className="flex items-center gap-4">
          
          <Link to="/" className="text-gray-600 hover:text-primary flex flex-col items-center text-xs gap-1 hidden md:flex">
            <Home size={20} />
            <span className="hidden md:inline">Beranda</span>
          </Link>

          {token ? (
            <>
              <div className="flex items-center gap-2 bg-indigo-50 text-primary px-3 py-1.5 rounded-full border border-indigo-100 mr-2">
                <div className="bg-primary text-white rounded-full p-1">
                  <User size={12} />
                </div>
                <span className="text-sm font-bold capitalize">
                  Halo, {user?.username || 'Kak'}!
                </span>
              </div>

              <Link to="/create" className="text-gray-600 hover:text-primary flex flex-col items-center text-xs gap-1">
                <PlusSquare size={20} />
                <span className="hidden md:inline">Pasang Iklan</span>
              </Link>

              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 flex flex-col items-center text-xs gap-1 ml-2">
                <LogOut size={20} />
                <span className="hidden md:inline">Keluar</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-sm font-bold shadow-md">
              <LogIn size={16} />
              Masuk
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}