import { Link, useNavigate } from 'react-router-dom';
import { Home, PlusSquare, LogOut, LogIn } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          🏠 Sekamar
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-primary flex flex-col items-center text-xs gap-1">
            <Home size={20} />
            Home
          </Link>

          {token ? (
            <>
              <Link to="/create" className="text-gray-600 hover:text-primary flex flex-col items-center text-xs gap-1">
                <PlusSquare size={20} />
                Post
              </Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 flex flex-col items-center text-xs gap-1">
                <LogOut size={20} />
                LogOut
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-primary flex flex-col items-center text-xs gap-1">
              <LogIn size={20} />
              Masuk
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}