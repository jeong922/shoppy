import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedPath({ children, requireAdmin }) {
  const { user } = useAuth();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace={true} />;
  }

  return children;
}
