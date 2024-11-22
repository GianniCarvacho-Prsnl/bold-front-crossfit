import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getWeightRecords } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import type { WeightRecord } from '../types';

const EXERCISES = [
  "Clean",
  "Squat Clean",
  "Clean & Jerk",
  "Front Squat",
  "Back Squat",
  "Snatch",
  "Squat Snatch",
  "Deadlift"
];

export function WeightHistory() {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [selectedExercise, setSelectedExercise] = useState('');
  const [records, setRecords] = useState<WeightRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!selectedExercise || !currentUser?.email) {
        return;
      }
  
      setIsLoading(true);
      try {
        console.log('Consultando registros para:', {
          email: currentUser.email,
          ejercicio: selectedExercise
        });
        
        const data = await getWeightRecords(currentUser.email, selectedExercise);
        const sortedData = Array.isArray(data) ? data.sort((a, b) => {
          const dateA = new Date(`${a.fecha}T${a.hora}`).getTime();
          const dateB = new Date(`${b.fecha}T${b.hora}`).getTime();
          return dateB - dateA;
        }) : [];
        setRecords(sortedData);
      } catch (error) {
        console.error('Error al obtener registros:', error);
        toast.error('Error al cargar el historial');
        setRecords([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchRecords();
  }, [selectedExercise, currentUser]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl p-6`}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4 sm:mb-0`}>
            Historial de Pesos
          </h1>
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className={`w-full sm:w-auto px-3 py-2 rounded-md ${
              theme === 'light'
                ? 'bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900'
                : 'bg-gray-700 border-gray-600 focus:border-blue-400 focus:ring-blue-400 text-white'
            }`}
          >
            <option value="">Selecciona un ejercicio</option>
            {EXERCISES.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <div className="text-center py-8">
            <p className={`text-lg ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
              Cargando registros...
            </p>
          </div>
        ) : !selectedExercise ? (
          <div className="text-center py-8">
            <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Selecciona un ejercicio para ver su historial
            </p>
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-8">
            <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              No hay registros para mostrar
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">
                    Fecha
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">
                    Hora
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">
                    RM (lb)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">
                    RM (kg)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">
                    Peso Discos (lb)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">
                    Repeticiones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {records.map((record, index) => (
                  <tr 
                    key={index}
                    className={theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-700'}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {record.fecha}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {record.hora}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-bold">
                      {record.rm_lb}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {record.rm_kg}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {record.peso_discos_lb}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {record.nrepeticiones}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}