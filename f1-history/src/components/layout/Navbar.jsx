import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth, useTheme } from '../../context/AppContext';

const Navbar = () => {
  const { dark, toggle } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: '/',           label: 'Inicio' },
    { to: '/temporadas', label: 'Temporadas' },
    { to: '/pilotos',    label: 'Pilotos' },
    { to: '/comparador', label: 'Comparador' },
    { to: '/dashboard',  label: 'Dashboard' },
    { to: '/circuitos',  label: 'Circuitos' },
    ...(isAdmin ? [{ to: '/admin', label: '⚙ Admin' }] : []),
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <span className="f1-badge">F1</span>
        <span>HISTORICAL DB</span>
      </div>

      <ul className="nav-links">
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) => isActive ? 'active' : ''}
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        {/* Toggle modo oscuro/claro */}
        <button className="btn-theme" onClick={toggle} title={dark ? 'Modo claro' : 'Modo oscuro'}>
          {dark ? '☀️' : '🌙'}
        </button>

        {/* Auth */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              background: 'rgba(229,9,20,0.1)',
              border: '1px solid rgba(229,9,20,0.3)',
              color: 'var(--accent)',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
            }}>
              👤 {user.name}
            </span>
            <button className="btn btn-secondary btn-sm" onClick={logout}>
              Salir
            </button>
          </div>
        ) : (
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/login')}>
            🔐 Admin
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
