'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { IEvent, EventType } from '@/types';
import { fetchUpcomingEvents } from '@/lib/api';
import { EventCard } from '@/components/events/EventCard';
import { EventGridSkeleton } from '@/components/common/LoadingSkeleton';
import { Search, Filter, CalendarDays, RefreshCw } from 'lucide-react';

const CATEGORIES: ('All' | EventType)[] = [
  'All',
  'Cleanup',
  'Plantation',
  'Donation',
  'Education',
  'Healthcare',
  'Other',
];

function UpcomingEventsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const validInitial = initialCategory && CATEGORIES.includes(initialCategory as EventType)
    ? initialCategory
    : 'All';

  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>(validInitial);
  const [search, setSearch] = useState<string>('');

  // Sync category state when URL query parameter changes
  useEffect(() => {
    const urlCat = searchParams.get('category');
    if (urlCat && CATEGORIES.includes(urlCat as EventType)) {
      setCategory(urlCat);
    } else if (!urlCat) {
      setCategory('All');
    }
  }, [searchParams]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchUpcomingEvents(category, search);
      setEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [category]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadEvents();
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
            Explore & Participate
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Upcoming Community Events
          </h1>
          <p className="text-sm sm:text-base text-foreground-muted mt-2">
            All active social drives scheduled for the coming weeks. Choose an event to inspect details and sign up as a volunteer.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-surface rounded-2xl border border-border p-4 mb-10 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by event title or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </form>

          {/* Category Dropdown / Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted shrink-0">
              <Filter className="w-4 h-4 text-primary" />
              <span>Category:</span>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            <button
              onClick={loadEvents}
              title="Refresh events"
              className="p-2.5 rounded-xl border border-border bg-surface-secondary hover:bg-surface text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <EventGridSkeleton count={6} />
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-surface rounded-3xl border border-border p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <CalendarDays className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No Events Found</h3>
            <p className="text-sm text-foreground-muted">
              {search || category !== 'All'
                ? 'No upcoming events match your filter criteria. Try adjusting your search query or category.'
                : 'There are currently no upcoming events scheduled.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UpcomingEventsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 bg-background min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EventGridSkeleton count={6} />
          </div>
        </div>
      }
    >
      <UpcomingEventsContent />
    </Suspense>
  );
}
