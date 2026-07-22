import { apiClient, isApiConfigured } from '@/shared/api/apiClient';

export async function subscribeToNewsletter(email: string): Promise<void> {
  if (!isApiConfigured) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }

  await apiClient.post('/newsletter', { email });
}
