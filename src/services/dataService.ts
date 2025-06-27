import { AllDataResponse } from '../types/dataTypes';
const API_BASE_URL = 'http://localhost:8080';

export const fetchAllData = async (): Promise<AllDataResponse> => {
  const response = await fetch(`${API_BASE_URL}/styles`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return await response.json();
};


