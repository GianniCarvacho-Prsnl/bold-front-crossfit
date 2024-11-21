import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface LocationState {
  from?: {
    pathname: string;
  };
}

export function Login() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from?.pathname || '/';
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('¡Inicio de sesión exitoso!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-lg p-8`}>
        <h1 className={`text-2xl font-bold mb-6 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          Iniciar Sesión
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-3 py-2 rounded-md border ${
                theme === 'light' 
                  ? 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500' 
                  : 'border-gray-600 bg-gray-700 text-white focus:ring-blue-400 focus:border-blue-400'
              }`}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className={`w-full px-3 py-2 rounded-md border ${
                theme === 'light' 
                  ? 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500' 
                  : 'border-gray-600 bg-gray-700 text-white focus:ring-blue-400 focus:border-blue-400'
              }`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200
              ${theme === 'light'
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400'
              } text-white focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:opacity-75 disabled:cursor-not-allowed`}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}