import { useState, useEffect } from 'react';
import { healthCheck } from '../services/api';

export const useHealthCheck = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await healthCheck();
        setStatus(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return { status, loading, error };
};
