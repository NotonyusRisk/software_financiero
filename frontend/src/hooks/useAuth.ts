// src/hooks/useAuth.ts

export const useAuth = () => {
  const token = localStorage.getItem('token');
  return { isAuthenticated: !!token, token };
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
