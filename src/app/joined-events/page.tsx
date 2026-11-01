'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PrivateRoute } from '@/components/common/PrivateRoute';
import { fetchMyJoinedEvents } from '@/lib/api';
import { IJoinedEvent } from '@/types';
import toast from 'react-hot-toast';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Tag,
  ArrowRight,
  Loader2,
  CalendarDays,
  Sparkles,
} from 'lucide-react';

export default function JoinedEventsPage() {
  const [events, setEvents] = useState<IJoinedEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadJoinedEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchMyJoinedEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching joined events:', error);
        toast.error('Failed to load your joined events.');
      } finally {
        setLoading(false);
      }
    };

    loadJoinedEvents();
  }, []);

  return (
    <PrivateRoute>
      <div className="py-12 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Volunteer Commitments</span>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">
              Your Joined Events
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              All community service initiatives you have joined, sorted chronologically by event date.
            </p>
          </div>

          {/* Content */}
          {loading ? (
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-sm text-foreground-muted">Loading your joined events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((joined) => (
                <div
                  key={joined._id}
                  className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all duration-300"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative w-full h-44 bg-surface-secondary">
                      <img
                        src={joined.thumbnailUrl}
                        alt={joined.eventTitle}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow-md">
                          <Tag className="w-3 h-3" />
                          {joined.eventType}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/90 text-white shadow-md backdrop-blur-sm">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Joined</span>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-foreground-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {new Date(joined.eventDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1 truncate max-w-[130px]">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          <span className="truncate">{joined.eventLocation}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground line-clamp-2">
                        {joined.eventTitle}
                      </h3>

                      <p className="text-xs text-foreground-muted">
                        Registered on {new Date(joined.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-4 border-t border-border bg-surface-secondary/50">
                    <Link
                      href={`/events/${joined.eventId}`}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-surface hover:bg-primary text-foreground hover:text-white border border-border hover:border-transparent font-medium text-sm transition-all shadow-sm"
                    >
                      <span>View Event Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface rounded-3xl border border-border p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <CalendarDays className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">No Events Joined Yet</h3>
              <p className="text-sm text-foreground-muted">
                You haven&apos;t joined any social events yet. Explore upcoming community drives and get involved!
              </p>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors shadow-sm"
              >
                <span>Browse Upcoming Events</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}

