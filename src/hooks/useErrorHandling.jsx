import { useState, useEffect } from 'react';

export function useErrorHandling() {
  const [error, setError] = useState(null);

  const displayError = (message) => {
    setError(message);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000); 

    return () => clearTimeout(timer);
  }, [error]);

  return { error, displayError };
}
