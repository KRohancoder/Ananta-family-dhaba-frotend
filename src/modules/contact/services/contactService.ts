import { apiClient, isApiConfigured } from '@/shared/api/apiClient';
import type { ContactRequest } from '../types/contact.types';

export async function sendContactMessage(request: ContactRequest): Promise<void> {
  if (!isApiConfigured) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }

  await apiClient.post('/contact', request);
}
