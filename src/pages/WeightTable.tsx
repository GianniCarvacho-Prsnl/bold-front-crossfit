import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getWeightRecords } from '../services/api';
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

function WeightTable() {
  const [selectedExercise, setSelectedExercise] = useState(EXERCISES[0]);
  const [records, setRecords] = useState<WeightRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      setIsLoading(true);
      try {
        const data = await getWeightRecords('BoltGianni', selectedExercise.toLowerCase());
        setRecords(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Error al cargar los registros');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [selectedExercise]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Historial de Pesos</h1>
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {EXERCISES.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </div>

        {/* ... resto del componente ... */}
      </div>
    </div>
  );
}

export default WeightTable;