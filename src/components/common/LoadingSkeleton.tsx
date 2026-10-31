import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
}

export const EventCardSkeleton: React.FC = () => {
  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden animate-pulse flex flex-col h-full shadow-sm">
      <div className="w-full h-48 bg-surface-secondary" />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-6 w-24 bg-surface-secondary rounded-full" />
            <div className="h-4 w-28 bg-surface-secondary rounded-md" />
          </div>
          <div className="h-6 w-3/4 bg-surface-secondary rounded-md" />
          <div className="h-4 w-1/2 bg-surface-secondary rounded-md" />
        </div>
        <div className="pt-4 border-t border-border">
          <div className="h-10 w-full bg-surface-secondary rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const EventGridSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
};

