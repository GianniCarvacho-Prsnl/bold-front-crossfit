import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { weightsTableData } from '../data/weightsTable';

export function WeightsTable() {
  const { theme } = useTheme();

  const containerClass = theme === 'light' 
    ? 'bg-white' 
    : 'bg-gray-800';

  const headerClass = theme === 'light'
    ? 'text-blue-600'
    : 'text-blue-400';

  const tableHeaderClass = theme === 'light'
    ? 'text-gray-600 border-b border-gray-200'
    : 'text-gray-200 border-b border-gray-700';

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`${containerClass} rounded-xl p-6`}>
        <h1 className={`text-2xl font-bold ${headerClass} mb-6 text-center`}>
          Tabla de Pesos
        </h1>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${tableHeaderClass}`}>
                  Libras por Lado
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${tableHeaderClass}`}>
                  Total Hombres (lb)
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${tableHeaderClass}`}>
                  Total Hombres (kg)
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${tableHeaderClass}`}>
                  Total Mujeres (lb)
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${tableHeaderClass}`}>
                  Total Mujeres (kg)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {weightsTableData.map((row, index) => (
                <tr key={index} className={theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-700'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.libras_por_lado}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.lbs_totales_barra_hombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.kgs_totales_barra_hombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.lbs_totales_barra_mujer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.kgs_totales_barra_mujer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}