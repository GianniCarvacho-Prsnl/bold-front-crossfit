import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createWeightRecord } from '../services/api';
import { AudioRecorder } from '../components/AudioRecorder';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

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

export function WeightForm() {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    ejercicio: EXERCISES[0],
    peso_discos_lb: '',
    nrepeticiones: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () => {
    const peso = Number(formData.peso_discos_lb);
    const reps = Number(formData.nrepeticiones);
    
    if (!formData.peso_discos_lb || peso <= 0) {
      toast.error('El peso debe ser mayor a 0');
      return false;
    }
    
    if (!formData.nrepeticiones || reps <= 0) {
      toast.error('Las repeticiones deben ser mayores a 0');
      return false;
    }

    if (!currentUser?.email) {
      toast.error('Debes iniciar sesión para registrar pesos');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) return;
    
    setIsSubmitting(true);

    try {
      const response = await createWeightRecord({
        usuario: currentUser!.email!,
        ejercicio: formData.ejercicio,
        peso_discos_lb: Number(formData.peso_discos_lb),
        nrepeticiones: Number(formData.nrepeticiones)
      });

      if (response.status === 'success') {
        toast.success('¡Registro guardado exitosamente!');
        setFormData(prev => ({ ...prev, peso_discos_lb: '', nrepeticiones: 1 }));
      } else {
        throw new Error(response.message || 'Error al guardar el registro');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al guardar el registro');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `w-full px-3 py-2 rounded-md border ${
    theme === 'light'
      ? 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
      : 'border-gray-600 bg-gray-700 text-white focus:ring-blue-400 focus:border-blue-400'
  }`;

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-lg p-6`}>
        <h1 className={`text-2xl font-bold mb-6 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          Registrar Nuevo Peso
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="exercise" className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
              Ejercicio
            </label>
            <select
              id="exercise"
              value={formData.ejercicio}
              onChange={(e) => setFormData(prev => ({ ...prev, ejercicio: e.target.value }))}
              className={inputClasses}
              required
            >
              {EXERCISES.map((exercise) => (
                <option key={exercise} value={exercise}>
                  {exercise}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="weight" className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
              Peso Total (lb)
            </label>
            <input
              type="number"
              id="weight"
              value={formData.peso_discos_lb}
              onChange={(e) => setFormData(prev => ({ ...prev, peso_discos_lb: e.target.value }))}
              onFocus={(e) => e.target.value === '0' && e.target.select()}
              min="1"
              step="1"
              className={inputClasses}
              placeholder="Ingrese el peso total"
              required
            />
          </div>

          <div>
            <label htmlFor="reps" className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
              Repeticiones
            </label>
            <input
              type="number"
              id="reps"
              min="1"
              value={formData.nrepeticiones}
              onChange={(e) => setFormData(prev => ({ ...prev, nrepeticiones: Number(e.target.value) }))}
              className={inputClasses}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200
              ${theme === 'light'
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400'
              } text-white focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:opacity-75 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Registro'}
          </button>
        </form>

        <div className={`mt-8 pt-8 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
          <AudioRecorder />
        </div>
      </div>
    </div>
  );
}