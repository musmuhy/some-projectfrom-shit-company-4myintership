import { useEffect, useState } from 'react';
import { fetchAllData } from '../services/dataService';
import { AllDataResponse } from '../types/dataTypes';

export const useFetchAllData = () => {
  const [data, setData] = useState<AllDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchAllData();
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    data,
    loading,
    error,

    styles: data?.styles || [],
    lbs: data?.Lb || []
  };
};