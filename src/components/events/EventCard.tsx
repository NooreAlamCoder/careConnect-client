import React from 'react';
import Link from 'next/link';
import { IEvent } from '@/types';
import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';

interface EventCardProps {
  event: IEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="group bg-surface rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative w-full h-48 overflow-hidden bg-surface-secondary">
        <img
          src={event.thumbnailUrl}
          alt={event.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback image if broken
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80';
          }}
        />
        {/* Event Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow-md">
            <Tag className="w-3 h-3" />
            {event.eventType}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Date & Location */}
          <div className="flex items-center justify-between text-xs text-foreground-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
              {new Date(event.eventDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1 truncate max-w-[150px]">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h3>

          {/* Description snippet */}
          <p className="text-sm text-foreground-muted line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* View Event Button */}
        <div className="pt-4 mt-4 border-t border-border">
          <Link
            href={`/events/${event._id}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-secondary hover:bg-primary text-foreground hover:text-white font-medium text-sm transition-all duration-200 cursor-pointer shadow-sm group/btn"
          >
            <span>View Event</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

