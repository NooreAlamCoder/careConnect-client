export type EventType =
  | 'Cleanup'
  | 'Plantation'
  | 'Donation'
  | 'Education'
  | 'Healthcare'
  | 'Other';

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  eventType: EventType;
  thumbnailUrl: string;
  location: string;
  eventDate: string; // ISO 8601 date string (YYYY-MM-DD)
  creatorEmail: string;
  creatorName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateEventPayload {
  title: string;
  description: string;
  eventType: EventType;
  thumbnailUrl: string;
  location: string;
  eventDate: string;
}

export interface IJoinedEvent {
  _id: string;
  eventId: string;
  userEmail: string;
  userName: string;
  joinedAt: string;
  eventTitle: string;
  eventType: EventType;
  eventLocation: string;
  eventDate: string;
  thumbnailUrl: string;
}

export interface IUser {
  email: string;
  displayName: string;
  photoURL: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  insertedId?: string;
  token?: string;
}

