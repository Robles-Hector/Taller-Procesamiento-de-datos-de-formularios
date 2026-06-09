import { useState, useEffect } from 'react';

// Hook central que carga los datos desde el JSON público
export const useF1Data = () => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetch('/data/f1Data.json')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar f1Data.json');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Expone las secciones del JSON directamente
  return {
    loading,
    error,
    seasons:     data?.seasons     ?? {},
    drivers:     data?.drivers     ?? [],
    teams:       data?.teams       ?? [],
    circuits:    data?.circuits    ?? [],
    recentRaces: data?.recentRaces ?? [],
  };
};

// Componente de pantalla de carga reutilizable
export const LoadingScreen = () => (
  <div style={{
    minHeight: '60vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '1rem'
  }}>
    <div style={{ fontSize: '3rem', animation: 'spin 1s linear infinite' }}>🏎</div>
    <div style={{ fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
      Cargando datos...
    </div>
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </div>
);

export const ErrorScreen = ({ message }) => (
  <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
    <div style={{ fontSize: '3rem' }}>⚠️</div>
    <div style={{ fontWeight: '700', color: 'var(--accent)' }}>Error al cargar datos</div>
    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{message}</div>
  </div>
);
