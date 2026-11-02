'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PrivateRoute } from '@/components/common/PrivateRoute';
import { createEvent } from '@/lib/api';
import { EventType } from '@/types';
import { ImageUploadInput } from '@/components/common/ImageUploadInput';
import toast from 'react-hot-toast';
import {
  PlusCircle,
  Calendar,
  MapPin,
  Image as ImageIcon,
  Tag,
  AlignLeft,
  Type,
  ArrowRight,
  Loader2,
} from 'lucide-react';

const EVENT_TYPES: EventType[] = [
  'Cleanup',
  'Plantation',
  'Donation',
  'Education',
  'Healthcare',
  'Other',
];

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState<EventType>('Donation');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [today, setToday] = useState('');

  React.useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !thumbnailUrl.trim() || !location.trim() || !eventDate) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Future date validation rule check
    if (eventDate < today) {
      toast.error('Invalid Date: Event date must be in the future.');
      return;
    }

    try {
      setSubmitting(true);
      await createEvent({
        title: title.trim(),
        description: description.trim(),
        eventType,
        thumbnailUrl: thumbnailUrl.trim(),
        location: location.trim(),
        eventDate,
      });

      toast.success('Event created successfully!');
      router.push('/events');
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || 'Failed to create event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="py-12 bg-background min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface rounded-3xl border border-border p-6 sm:p-10 shadow-xl">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Host a Community Event
              </h1>
              <p className="text-sm text-foreground-muted mt-1.5">
                Organize a social development drive and mobilize volunteers across your neighborhood.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-2">
                  Event Title *
                </label>
                <div className="relative">
                  <Type className="w-5 h-5 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Winter Blanket Distribution for the Needy"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Event Type & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Event Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-2">
                    Event Type *
                  </label>
                  <div className="relative">
                    <Tag className="w-5 h-5 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value as EventType)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer appearance-none"
                    >
                      {EVENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Event Date (Strict Future Date with min attribute) */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-2">
                    Event Date (Future only) *
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      min={today}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-2">
                  Event Location *
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mirpur 10 Circle, Dhaka"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Thumbnail Image (Upload or URL) */}
              <ImageUploadInput
                value={thumbnailUrl}
                onChange={setThumbnailUrl}
                label="Thumbnail Image"
                required
              />

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-2">
                  Event Description *
                </label>
                <div className="relative">
                  <AlignLeft className="w-5 h-5 text-foreground-muted absolute left-3.5 top-3.5" />
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the volunteer objectives, schedule, things to bring, and meetup point..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-y"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-all shadow-lg shadow-primary/25 cursor-pointer disabled:opacity-50 mt-4"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Publishing Event...</span>
                  </>
                ) : (
                  <>
                    <span>Create Event</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}

// Event type select options

// Strict future date boundary check

// ImageUploadInput integration
