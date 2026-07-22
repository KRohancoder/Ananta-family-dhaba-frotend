import { apiClient, isApiConfigured } from '@/shared/api/apiClient';
import type { ReservationRequest } from '../types/reservation.types';

export async function submitReservation(request: ReservationRequest): Promise<void> {
  if (!isApiConfigured) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }

  await apiClient.post('/reservations', request);
}

/** WhatsApp deep link pre-filled with reservation details, as a fallback since there is no live booking backend yet. */
export function buildWhatsAppConfirmationLink(
  request: ReservationRequest,
  whatsappNumber: string,
): string {
  const message = [
    `Reservation request for ${request.name} (${request.phone})`,
    `Party size: ${request.partySize}`,
    `Date: ${request.date} at ${request.time}`,
    request.notes ? `Notes: ${request.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
