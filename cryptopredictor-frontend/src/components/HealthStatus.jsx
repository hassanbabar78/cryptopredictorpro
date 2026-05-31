import React from 'react';
import { useHealthCheck } from '../hooks/useHealthCheck';

const HealthStatus = () => {
  const { status, loading, error } = useHealthCheck();

  if (loading) {
    return <div className="text-white">Loading backend status...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-lg text-sm ${status.status === 'healthy' && status.mongodb === 'connected' ? 'bg-green-600' : 'bg-red-600'}`}>
      <p className="text-white font-semibold">Backend Status: {status.status}</p>
      <p className="text-white">MongoDB: {status.mongodb}</p>
    </div>
  );
};

export default HealthStatus;
