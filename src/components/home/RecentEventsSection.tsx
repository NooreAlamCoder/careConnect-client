'use client';

import React from 'react';
import Link from 'next/link';
import { IEvent } from '@/types';
import { EventCard } from '@/components/events/EventCard';
import { EventGridSkeleton } from '@/components/common/LoadingSkeleton';
import { ArrowRight, CalendarDays } from 'lucide-react';

interface RecentEventsSectionProps {
  events: IEvent[];
  loading?: boolean;
}

export const RecentEventsSection: React.FC<RecentEventsSectionProps> = ({
  events,
  loading = false,
}) => {
  return (
    <section className="py-20 bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
              Action Happening Soon
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Recent Upcoming Events
            </h2>
            <p className="text-sm sm:text-base text-foreground-muted mt-2">
              Discover local initiatives needing your support in the coming days.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover group cursor-pointer"
          >
            <span>See All Upcoming Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Events Grid */}
        {loading ? (
          <EventGridSkeleton count={6} />
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-surface rounded-3xl border border-border p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <CalendarDays className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No Upcoming Events Right Now</h3>
            <p className="text-sm text-foreground-muted">
              Be the leader in your community! Create the first upcoming social development drive today.
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors"
            >
              <span>Create Event</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

