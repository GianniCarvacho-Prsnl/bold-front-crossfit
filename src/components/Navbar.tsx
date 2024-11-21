import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Dumbbell, User, LogOut } from 'lucide-react';
import { ThemeSwitch } from './ThemeSwitch';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

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
            <Dumbbell className={`h-8 w-8 ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`} />
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
              <Link to="/record" className={`${linkClasses} px-3 py-2 transition-colors duration-300`}>
                Registrar Peso
              </Link>
              <Link to="/history" className={`${linkClasses} px-3 py-2 transition-colors duration-300`}>
                Historial
              </Link>
              <Link to="/weights-table" className={`${linkClasses} px-3 py-2 transition-colors duration-300`}>
                Tabla
              </Link>
            </div>
          </div>

          {/* Theme Switch and Login/Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSwitch />
            {currentUser ? (
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-1 ${linkClasses} px-3 py-2 transition-colors duration-300`}
              >
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-1 ${linkClasses} px-3 py-2 transition-colors duration-300`}
              >
                <User className="h-5 w-5" />
                <span>Iniciar Sesión</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeSwitch />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${linkClasses} focus:outline-none`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`${linkClasses} px-3 py-2 transition-colors duration-300`}
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/record"
                className={`${linkClasses} px-3 py-2 transition-colors duration-300`}
                onClick={() => setIsOpen(false)}
              >
                Registrar Peso
              </Link>
              <Link
                to="/history"
                className={`${linkClasses} px-3 py-2 transition-colors duration-300`}
                onClick={() => setIsOpen(false)}
              >
                Historial
              </Link>
              <Link
                to="/weights-table"
                className={`${linkClasses} px-3 py-2 transition-colors duration-300`}
                onClick={() => setIsOpen(false)}
              >
                Tabla
              </Link>
              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className={`flex items-center space-x-1 ${linkClasses} px-3 py-2 transition-colors duration-300`}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Cerrar Sesión</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`flex items-center space-x-1 ${linkClasses} px-3 py-2 transition-colors duration-300`}
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Iniciar Sesión</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}