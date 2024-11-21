import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Mic, Square, Upload } from 'lucide-react';

function AudioRecorder() {
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
      toast.error('Failed to access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const uploadAudio = async () => {
    if (!audioBlob) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    try {
      const response = await fetch('https://crossfit-backend.fly.dev/process_audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload audio');

      toast.success('Audio processed successfully');
      setAudioBlob(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process audio');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Audio Recording</h1>

        <div className="space-y-6">
          <div className="flex justify-center">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-4 rounded-full ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white transition-colors duration-200`}
            >
              {isRecording ? (
                <Square className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </button>
          </div>

          {audioBlob && (
            <div className="space-y-4">
              <audio controls className="w-full">
                <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
                Your browser does not support the audio element.
              </audio>

              <button
                onClick={uploadAudio}
                disabled={isUploading}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isUploading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <Upload className="h-5 w-5" />
                <span>{isUploading ? 'Processing...' : 'Process Audio'}</span>
              </button>
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            {isRecording ? (
              <p>Recording in progress... Click the button to stop.</p>
            ) : (
              <p>Click the microphone button to start recording</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioRecorder;