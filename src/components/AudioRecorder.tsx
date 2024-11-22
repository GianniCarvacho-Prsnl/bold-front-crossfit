import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Mic, Square, Upload, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext'; // Importar el contexto de autenticación

export function AudioRecorder() {
  const { theme } = useTheme();
  const { currentUser } = useAuth(); // Obtener el usuario logueado
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      toast.error('Error al acceder al micrófono');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const cancelRecording = () => {
    if (audioBlob) {
      setAudioBlob(null);
    }
  };

  const uploadAudio = async () => {
    if (!audioBlob || !currentUser || !currentUser.email) {
      toast.error('Por favor, grabe un audio y asegúrese de que haya iniciado sesión.');
      return;
    }
  
    setIsUploading(true);
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm'); // El archivo de audio
    const usuario = currentUser.email; // Usuario autenticado
  
    try {
      const response = await fetch(`https://crossfit-backend-v2.fly.dev/process_audio?usuario=${encodeURIComponent(usuario)}`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json', // Asegura que se espera una respuesta JSON
        },
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); // Obtén el mensaje de error del servidor
        throw new Error(`Error del servidor: ${errorMessage}`);
      }
  
      const data = await response.json();
      toast.success('Audio procesado exitosamente');
      console.log('Respuesta del servidor:', data);
      setAudioBlob(null); // Limpia el estado
    } catch (error) {
      console.error('Error al procesar el audio:', error);
      toast.error(error instanceof Error ? error.message : 'Error desconocido al procesar el audio');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
        Grabación de Audio
      </h2>

      <div className="flex justify-center space-x-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-4 rounded-full ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gray-900 hover:bg-gray-800'
          } text-white transition-colors duration-200`}
        >
          {isRecording ? (
            <Square className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </button>
      </div>

      {audioBlob && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <audio controls className="flex-1">
              <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
              Su navegador no soporta el elemento de audio.
            </audio>
            <button
              onClick={cancelRecording}
              className="ml-2 p-2 text-gray-600 hover:text-gray-900"
              title="Cancelar grabación"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={uploadAudio}
            disabled={isUploading}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
              isUploading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <Upload className="h-5 w-5" />
            <span>{isUploading ? 'Procesando...' : 'Procesar Audio'}</span>
          </button>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        {isRecording ? (
          <p>Grabando... Haz clic en el botón para detener.</p>
        ) : (
          <p>COmponent-Haz clic en el botón del micrófono para comenzar a grabar</p>
        )}
      </div>
    </div>
  );
}