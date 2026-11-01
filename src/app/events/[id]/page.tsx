'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IEvent } from '@/types';
import { fetchEventById, joinEvent } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import {
  Calendar,
  MapPin,
  Tag,
  User,
  Heart,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Clock,
  Loader2,
} from 'lucide-react';

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();

  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [joining, setJoining] = useState<boolean>(false);
  const [joinedSuccess, setJoinedSuccess] = useState<boolean>(false);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchEventById(id);
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        toast.error('Failed to load event details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDetails();
    }
  }, [id]);

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error('Please log in first to join this community event.');
      router.push('/login');
      return;
    }

    try {
      setJoining(true);
      await joinEvent(id);
      setJoinedSuccess(true);
      toast.success('Successfully joined the event! Check your Joined Events tab.');
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || 'Failed to join event.');
    } finally {
      setJoining(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Event link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm text-foreground-muted">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-foreground mb-2">Event Not Found</h2>
        <p className="text-sm text-foreground-muted mb-6">
          The event you are looking for might have been removed or does not exist.
        </p>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Upcoming Events</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Upcoming Events</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="bg-surface rounded-3xl border border-border overflow-hidden shadow-xl mb-8">
          {/* Main Image Header */}
          <div className="relative w-full h-80 sm:h-96 bg-surface-secondary">
            <img
              src={event.thumbnailUrl}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-primary text-white shadow-lg">
                <Tag className="w-3.5 h-3.5" />
                {event.eventType}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={handleShare}
                type="button"
                className="p-2.5 rounded-full bg-surface/80 backdrop-blur-md text-foreground hover:bg-surface border border-border shadow-md transition-all cursor-pointer"
                title="Share Event"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-10 space-y-8">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
                {event.title}
              </h1>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-surface-secondary border border-border text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted">Scheduled Date</p>
                    <p className="font-semibold text-foreground">
                      {new Date(event.eventDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted">Location</p>
                    <p className="font-semibold text-foreground truncate">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted">Organizer</p>
                    <p className="font-semibold text-foreground truncate">
                      {event.creatorName || event.creatorEmail.split('@')[0]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground">About This Social Drive</h3>
              <p className="text-foreground-muted text-base leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Call to Action: Join Event */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Ready to make a difference?
                </p>
                <p className="text-xs text-foreground-muted">
                  Join as a volunteer to receive event updates and coordination guidelines.
                </p>
              </div>

              {joinedSuccess ? (
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>You Have Joined This Event</span>
                </div>
              ) : (
                <button
                  onClick={handleJoinEvent}
                  disabled={joining}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-base transition-all shadow-lg shadow-primary/25 cursor-pointer disabled:opacity-50"
                >
                  {joining ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 fill-current" />
                      <span>Join Event</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// Event metadata details rendered
