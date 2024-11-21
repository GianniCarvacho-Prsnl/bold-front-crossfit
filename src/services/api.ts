import type { WeightRecord } from '../types';
import { getConfig } from '../config/environment';

const config = getConfig();

export async function createWeightRecord(data: {
  usuario: string;
  ejercicio: string;
  peso_discos_lb: number;
  nrepeticiones: number;
}): Promise<{ status: string; message?: string; data?: WeightRecord }> {
  console.log('📝 Creando registro de peso:', data);
  
  try {
    const response = await fetch(`${config.apiUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
      throw new Error(errorData.message || `Error del servidor: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('✅ Registro creado:', responseData);
    return responseData;

  } catch (error) {
    console.error('❌ Error en la petición:', error);
    throw error instanceof Error ? error : new Error('Error desconocido');
  }
}

export async function getWeightRecords(usuario: string, ejercicio: string): Promise<WeightRecord[]> {
  // Codificamos manualmente los caracteres especiales
  const encodedUsuario = encodeURIComponent(usuario).replace(/%40/g, '@');
  const encodedEjercicio = ejercicio.split(' ').map(part => encodeURIComponent(part)).join('%20');
  const url = `${config.apiUrl}/${encodedUsuario}/${encodedEjercicio}`;
  
  console.log('🔍 Consultando historial:');
  console.log('📡 URL:', url);
  console.log('👤 Usuario:', usuario);
  console.log('🏋️ Ejercicio:', ejercicio);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (response.status === 404) {
      console.log('ℹ️ No se encontraron registros');
      return [];
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Datos recibidos:', data);
    return data;

  } catch (error) {
    console.error('❌ Error al obtener registros:', error);
    throw error;
  }
}