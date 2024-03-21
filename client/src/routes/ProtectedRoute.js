import React from 'react';
import { Navigate } from 'react-router-dom';

export default function protectedRoute({ loggedIn, children }) {
  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }
  return children;
}
