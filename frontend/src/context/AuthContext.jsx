import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado
    const savedUser = localStorage.getItem('minimundo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Registrar un nuevo perfil de niño
  const register = async (name, age, avatar = 'default') => {
    try {
      const response = await api.post('/auth/register', { name, age, avatar });
      const { user: newUser, token } = response.data;

      localStorage.setItem('minimundo_token', token);
      localStorage.setItem('minimundo_user', JSON.stringify(newUser));
      setUser(newUser);

      return newUser;
    } catch (error) {
      console.error('Error al registrar:', error);
      throw error;
    }
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem('minimundo_token');
    localStorage.removeItem('minimundo_user');
    setUser(null);
  };

  // Actualizar datos del usuario en el estado
  const updateUser = (updatedData) => {
    const updated = { ...user, ...updatedData };
    localStorage.setItem('minimundo_user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
