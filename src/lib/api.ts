import { IApiResponse, IEvent, IJoinedEvent, ICreateEventPayload } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api';

const getAuthHeaders = (): HeadersInit => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// 1. Fetch 6 Recent Events for Home Page
export const fetchRecentEvents = async (): Promise<IEvent[]> => {
  const res = await fetch(`${API_BASE_URL}/events/recent`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch recent events');
  }
  const result: IApiResponse<IEvent[]> = await res.json();
  return result.data || [];
};

// 2. Fetch All Upcoming Events (with optional category and search query)
export const fetchUpcomingEvents = async (
  category?: string,
  search?: string
): Promise<IEvent[]> => {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search && search.trim() !== '') params.append('search', search.trim());

  const url = `${API_BASE_URL}/events/upcoming${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch upcoming events');
  }
  const result: IApiResponse<IEvent[]> = await res.json();
  return result.data || [];
};

// 3. Fetch Single Event Details
export const fetchEventById = async (id: string): Promise<IEvent> => {
  const res = await fetch(`${API_BASE_URL}/events/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch event details');
  }
  const result: IApiResponse<IEvent> = await res.json();
  if (!result.data) {
    throw new Error('Event not found');
  }
  return result.data;
};

// 4. Create New Event (Protected)
export const createEvent = async (payload: ICreateEventPayload): Promise<IApiResponse<void>> => {
  const res = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data: IApiResponse<void> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create event');
  }
  return data;
};

// 5. Fetch Events Created by Current User (Protected)
export const fetchMyEvents = async (): Promise<IEvent[]> => {
  const res = await fetch(`${API_BASE_URL}/events/user/my-events`, {
    headers: getAuthHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch your events');
  }
  const result: IApiResponse<IEvent[]> = await res.json();
  return result.data || [];
};

// 6. Update Event (Protected)
export const updateEvent = async (
  id: string,
  payload: Partial<ICreateEventPayload>
): Promise<IApiResponse<void>> => {
  const res = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data: IApiResponse<void> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update event');
  }
  return data;
};

// 7. Delete Event (Protected)
export const deleteEvent = async (id: string): Promise<IApiResponse<void>> => {
  const res = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data: IApiResponse<void> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete event');
  }
  return data;
};

// 8. Join an Event (Protected)
export const joinEvent = async (eventId: string): Promise<IApiResponse<void>> => {
  const res = await fetch(`${API_BASE_URL}/events/action/join`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ eventId }),
  });
  const data: IApiResponse<void> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to join event');
  }
  return data;
};

// 9. Fetch Events Joined by Current User (Protected)
export const fetchMyJoinedEvents = async (): Promise<IJoinedEvent[]> => {
  const res = await fetch(`${API_BASE_URL}/events/user/joined-by-me`, {
    headers: getAuthHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch joined events');
  }
  const result: IApiResponse<IJoinedEvent[]> = await res.json();
  return result.data || [];
};

