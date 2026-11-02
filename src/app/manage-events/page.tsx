'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PrivateRoute } from '@/components/common/PrivateRoute';
import { fetchMyEvents, updateEvent, deleteEvent } from '@/lib/api';
import { IEvent, EventType } from '@/types';
import { ImageUploadInput } from '@/components/common/ImageUploadInput';
import toast from 'react-hot-toast';
import {
  FolderKanban,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Tag,
  PlusCircle,
  X,
  Check,
  Loader2,
  AlertCircle,
} from 'lucide-react';

const EVENT_TYPES: EventType[] = [
  'Cleanup',
  'Plantation',
  'Donation',
  'Education',
  'Healthcare',
  'Other',
];

export default function ManageEventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // Form state for editing
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState<EventType>('Donation');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');

  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  const loadMyEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchMyEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching my events:', error);
      toast.error('Failed to load your events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyEvents();
  }, []);

  const openEditModal = (event: IEvent) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setEventType(event.eventType);
    setThumbnailUrl(event.thumbnailUrl);
    setLocation(event.location);
    setEventDate(event.eventDate);
  };

  const closeEditModal = () => {
    setEditingEvent(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    if (!title.trim() || !description.trim() || !thumbnailUrl.trim() || !location.trim() || !eventDate) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (eventDate < today) {
      toast.error('Invalid Date: Event date must be in the future.');
      return;
    }

    try {
      setActionLoading(true);
      await updateEvent(editingEvent._id, {
        title: title.trim(),
        description: description.trim(),
        eventType,
        thumbnailUrl: thumbnailUrl.trim(),
        location: location.trim(),
        eventDate,
      });

      toast.success('Event updated successfully!');
      closeEditModal();
      await loadMyEvents();
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || 'Failed to update event.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this event?')) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteEvent(id);
      toast.success('Event deleted successfully.');
      setEvents((prev) => prev.filter((ev) => ev._id !== id));
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || 'Failed to delete event.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <PrivateRoute>
      <div className="py-12 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                <FolderKanban className="w-3.5 h-3.5" />
                <span>Organizer Dashboard</span>
              </div>
              <h1 className="text-3xl font-extrabold text-foreground">
                Manage Your Events
              </h1>
              <p className="text-sm text-foreground-muted mt-1">
                View, update, or remove social events you have organized.
              </p>
            </div>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Event</span>
            </Link>
          </div>

          {/* Content */}
          {loading ? (
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-sm text-foreground-muted">Loading your organized events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative w-full h-44 bg-surface-secondary">
                      <img
                        src={event.thumbnailUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow-md">
                          <Tag className="w-3 h-3" />
                          {event.eventType}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-foreground-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {new Date(event.eventDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1 truncate max-w-[130px]">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          <span className="truncate">{event.location}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground line-clamp-1">
                        {event.title}
                      </h3>

                      <p className="text-sm text-foreground-muted line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 border-t border-border bg-surface-secondary/50 flex items-center justify-end gap-2">
                    <Link
                      href={`/events/${event._id}`}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg text-foreground hover:bg-surface border border-border transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => openEditModal(event)}
                      type="button"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      disabled={deletingId === event._id}
                      type="button"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{deletingId === event._id ? 'Deleting...' : 'Delete'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface rounded-3xl border border-border p-12 text-center max-w-lg mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">You Haven&apos;t Hosted Any Events</h3>
              <p className="text-sm text-foreground-muted">
                Create your first volunteer or social welfare drive to mobilize supporters in your community.
              </p>
              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors"
              >
                <span>Host an Event Now</span>
              </Link>
            </div>
          )}

          {/* Edit Modal */}
          {editingEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-surface border border-border rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">Update Event</h3>
                  <button
                    onClick={closeEditModal}
                    className="p-2 rounded-full hover:bg-surface-secondary text-foreground-muted hover:text-foreground cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
                      Event Title
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
                        Category
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value as EventType)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {EVENT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
                        Event Date (Future only)
                      </label>
                      <input
                        type="date"
                        required
                        min={today}
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Thumbnail Image (Upload or URL) */}
                  <ImageUploadInput
                    value={thumbnailUrl}
                    onChange={setThumbnailUrl}
                    label="Thumbnail Image"
                    required
                  />

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
                      Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-surface-secondary cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all shadow-md shadow-primary/20 cursor-pointer disabled:opacity-50"
                    >
                      {actionLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}

// Organizer metrics summary

// Modal prefill state handler

// Delete confirmation dialog

// Edit modal ImageUploadInput
