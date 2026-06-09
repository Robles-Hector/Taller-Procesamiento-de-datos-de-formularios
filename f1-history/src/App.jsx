import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ThemeProvider, AdminDataProvider } from './context/AppContext';
import { useAuth } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import HomePage from './components/pages/HomePage';
import SeasonsPage from './components/pages/SeasonsPage';
import DriversPage from './components/pages/DriversPage';
import PilotPage from './components/pages/PilotPage';
import ComparatorPage from './components/pages/ComparatorPage';
import DashboardPage from './components/pages/DashboardPage';
import CircuitsPage from './components/pages/CircuitsPage';
import AdminPage from './components/pages/AdminPage';
import LoginPage from './components/pages/LoginPage';
import './App.css';

// Ruta protegida: redirige a /login si no es admin
const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/"           element={<HomePage />} />
      <Route path="/temporadas" element={<SeasonsPage />} />
      <Route path="/pilotos"    element={<DriversPage />} />
      <Route path="/piloto/:slug" element={<PilotPage />} />
      <Route path="/comparador" element={<ComparatorPage />} />
      <Route path="/dashboard"  element={<DashboardPage />} />
      <Route path="/circuitos"  element={<CircuitsPage />} />
      <Route path="/login"      element={<LoginPage />} />
      <Route path="/admin"      element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      <Route path="*" element={
        <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏎</div>
            <div style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>404</div>
            <div style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Página no encontrada</div>
            <a href="/" className="btn btn-primary">Volver al inicio</a>
          </div>
        </div>
      } />
    </Routes>
  </>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AdminDataProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </AdminDataProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
