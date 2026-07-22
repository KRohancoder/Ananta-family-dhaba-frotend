export interface ReservationRequest {
  name: string;
  phone: string;
  partySize: number;
  date: string;
  time: string;
  notes?: string;
}
