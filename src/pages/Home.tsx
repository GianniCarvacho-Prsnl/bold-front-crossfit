import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Table } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export function Home() {
  const { currentUser } = useAuth();
  const { theme } = useTheme();

  const cardClass = theme === 'light'
    ? 'bg-white hover:bg-gray-50'
    : 'bg-gray-800 hover:bg-gray-700';

  const textClass = theme === 'light'
    ? 'text-gray-900'
    : 'text-white';

  const descriptionClass = theme === 'light'
    ? 'text-gray-600'
    : 'text-gray-300';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold ${textClass} mb-4`}>
          Registra tu Progreso en CrossFit
        </h1>
        <p className={`text-lg ${descriptionClass}`}>
          Registra, monitorea y mejora tu rendimiento en CrossFit con nuestras herramientas.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {currentUser ? (
          <>
            <Link
              to="/record"
              className={`${cardClass} rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'} p-3 rounded-full mb-4`}>
                  <Dumbbell className={`h-8 w-8 ${textClass}`} />
                </div>
                <h2 className={`text-xl font-semibold ${textClass} mb-2`}>Registrar Peso</h2>
                <p className={descriptionClass}>
                  Registra tus récords personales y realiza seguimiento de tu progreso.
                </p>
              </div>
            </Link>

            <Link
              to="/history"
              className={`${cardClass} rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'} p-3 rounded-full mb-4`}>
                  <Table className={`h-8 w-8 ${textClass}`} />
                </div>
                <h2 className={`text-xl font-semibold ${textClass} mb-2`}>Historial</h2>
                <p className={descriptionClass}>
                  Visualiza y analiza tus registros de peso y rendimiento.
                </p>
              </div>
            </Link>
          </>
        ) : (
          <div className="md:col-span-2">
            <div className={`${cardClass} rounded-xl shadow-md p-8 text-center`}>
              <h2 className={`text-xl font-semibold ${textClass} mb-4`}>
                ¡Bienvenido a CrossFit Tracker!
              </h2>
              <p className={`${descriptionClass} mb-6`}>
                Inicia sesión para comenzar a registrar y dar seguimiento a tus entrenamientos.
              </p>
              <Link
                to="/login"
                className={`inline-block px-6 py-3 rounded-md ${
                  theme === 'light'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors duration-200`}
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className={`mt-12 ${cardClass} rounded-xl shadow-md p-8`}>
        <h2 className={`text-2xl font-bold ${textClass} mb-4`}>¿Por qué registrar tu progreso?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className={`text-lg font-semibold ${textClass} mb-2`}>Monitorea tu Crecimiento</h3>
            <p className={descriptionClass}>
              Mantén un registro de tus mejoras e identifica áreas que necesitan más atención.
            </p>
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${textClass} mb-2`}>Establece Mejores Metas</h3>
            <p className={descriptionClass}>
              Utiliza tus datos para establecer objetivos realistas y alcanzables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}