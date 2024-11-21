import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { WeightForm } from './pages/WeightForm';
import { WeightHistory } from './pages/WeightHistory';
import { WeightsTable } from './pages/WeightsTable';
import { Login } from './pages/Login';
import { useTheme } from './contexts/ThemeContext';

function AppContent() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/record" 
            element={
              <ProtectedRoute>
                <WeightForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <WeightHistory />
              </ProtectedRoute>
            } 
          />
          <Route path="/weights-table" element={<WeightsTable />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: theme === 'light' ? '#fff' : '#374151',
            color: theme === 'light' ? '#111827' : '#fff',
          },
        }}
      />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}