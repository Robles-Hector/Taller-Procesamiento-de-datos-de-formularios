import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Auth Context ─────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setUser({ role: 'admin', name: 'Administrador' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);
  const isAdmin = user?.role === 'admin';
  const isGuest = !user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// ─── Theme Context ─────────────────────────────────────────────────────────
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true);

  // CRÍTICO: sincronizar la clase del tema con <html> y <body>
  // para que TODO el documento cambie, no solo el div contenedor
  useEffect(() => {
    const root = document.documentElement; // <html>
    const body = document.body;

    if (dark) {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
      body.classList.add('theme-dark');
      body.classList.remove('theme-light');
    } else {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
      body.classList.add('theme-light');
      body.classList.remove('theme-dark');
    }
  }, [dark]);

  const toggle = () => setDark(d => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {/* El div wrapper también tiene la clase para los componentes anidados */}
      <div className={dark ? 'theme-dark' : 'theme-light'} style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// ─── Admin Data Context ────────────────────────────────────────────────────
const AdminDataContext = createContext(null);

export const AdminDataProvider = ({ children }) => {
  const [pendingTeams, setPendingTeams] = useState([]);

  const addTeam = (team) => {
    setPendingTeams(prev => [...prev, { ...team, addedYear: 2027, id: Date.now() }]);
  };

  return (
    <AdminDataContext.Provider value={{ pendingTeams, addTeam }}>
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => useContext(AdminDataContext);
