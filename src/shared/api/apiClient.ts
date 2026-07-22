import axios, { type AxiosError } from 'axios';
import { env } from '@/config/env';

interface ApiErrorPayload {
  message?: string;
}

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => {
    const message =
      error.response?.data?.message ?? error.message ?? 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  },
);

/** True when no backend is configured — services fall back to simulated responses. */
export const isApiConfigured = Boolean(env.apiBaseUrl);
