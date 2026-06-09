import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';

const LoginPage = () => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Si ya es admin, redirige
  const from = location.state?.from || '/admin';
  if (isAdmin) { navigate(from, { replace: true }); }

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Completa todos los campos');
      return;
    }
    setLoading(true);
    setError('');
    // Pequeño delay para simular validación
    await new Promise(r => setTimeout(r, 600));
    const ok = login(username, password);
    setLoading(false);
    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError('Usuario o contraseña incorrectos');
      setPassword('');
    }
  };

  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* Fondo decorativo */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'var(--gradient-hero)',
        opacity: 0.6,
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(229,9,20,0.08) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(229,9,20,0.05) 0%, transparent 40%)`,
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px', padding: '1.5rem' }}>

        {/* Logo / Marca */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{
              background: 'var(--accent)', color: 'white',
              fontSize: '0.85rem', padding: '4px 12px', borderRadius: '3px',
              fontWeight: '900', letterSpacing: '0.15em'
            }}>F1</span>
            <span style={{ fontWeight: '900', fontSize: '1.1rem', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>
              HISTORICAL DB
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Acceso exclusivo para administradores
          </div>
        </div>

        {/* Card del formulario */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: 'var(--shadow)',
        }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '0.25rem' }}>
            Iniciar Sesión
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Ingresa tus credenciales de administrador
          </p>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(229,9,20,0.08)',
              border: '1px solid rgba(229,9,20,0.3)',
              color: 'var(--accent)',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Formulario */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>

            {/* Usuario */}
            <div className="form-group">
              <label className="form-label">Usuario</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: 'var(--text-muted)' }}>
                  👤
                </span>
                <input
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', width: '100%' }}
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  autoFocus
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: 'var(--text-muted)' }}>
                  🔒
                </span>
                <input
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', paddingRight: '3rem', width: '100%' }}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  style={{
                    position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem',
                    color: 'var(--text-muted)',
                  }}
                  title={showPass ? 'Ocultar' : 'Mostrar'}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>

          {/* Botón */}
          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', height: '48px', fontSize: '0.9rem' }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
                Verificando...
              </span>
            ) : (
              '🔐 Iniciar Sesión'
            )}
          </button>

          {/* Pista / hint */}
          <div style={{
            marginTop: '1.5rem',
            padding: '0.85rem 1rem',
            background: 'var(--bg-secondary)',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
          }}>
            Credenciales de prueba: <code style={{ background: 'var(--bg-input)', padding: '1px 6px', borderRadius: '3px', color: 'var(--accent)' }}>admin</code> / <code style={{ background: 'var(--bg-input)', padding: '1px 6px', borderRadius: '3px', color: 'var(--accent)' }}>admin123</code>
          </div>
        </div>

        {/* Volver */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            ← Volver al inicio
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default LoginPage;
