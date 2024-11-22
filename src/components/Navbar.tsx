import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { ThemeSwitch } from './ThemeSwitch';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { FaChartLine, FaTable } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Sesión cerrada exitosamente');
      navigate('/login');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  const navClasses = theme === 'light'
    ? 'bg-white shadow-lg'
    : 'bg-gray-800 border-b border-gray-700';

  const linkClasses = theme === 'light'
    ? 'text-gray-600 hover:text-gray-900'
    : 'text-gray-300 hover:text-white';

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GiWeightLiftingUp className={`h-8 w-8 ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`} />
            <span className={`font-bold text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              CrossFit Registro
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <Link to="/" className={`${linkClasses} px-3 py-2 transition-colors duration-300`}>
                Inicio
              </Link>
              <Link to="/record" className={`${linkClasses} px-3 py-2 transition-colors duration-300 flex items-center space-x-2`}>
                <GiWeightLiftingUp />
                <span>Registrar Peso</span>
              </Link>
              <Link to="/history" className={`${linkClasses} px-3 py-2 transition-colors duration-300 flex items-center space-x-2`}>
                <FaChartLine />
                <span>Historial</span>
              </Link>
              <Link to="/weights-table" className={`${linkClasses} px-3 py-2 transition-colors duration-300 flex items-center space-x-2`}>
                <FaTable />
                <span>Tabla Conversión</span>
              </Link>
            </div>
          </div>

          {/* Theme Switch and Login/Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSwitch />
            {currentUser ? (
              <button onClick={handleLogout} className="flex items-center space-x-2">
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Iniciar Sesión</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}