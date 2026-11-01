import { fetchRecentEvents } from '@/lib/api';
import { HeroBanner } from '@/components/home/HeroBanner';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { RecentEventsSection } from '@/components/home/RecentEventsSection';
import { GallerySection } from '@/components/home/GallerySection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { IEvent } from '@/types';

export default async function HomePage() {
  let recentEvents: IEvent[] = [];

  try {
    recentEvents = await fetchRecentEvents();
  } catch (error) {
    console.warn('Could not fetch recent events during SSR (Backend might be starting):', error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Feature Section */}
      <FeaturesSection />

      {/* 3. Recent Upcoming Events Section (Dynamic - 6 items with .limit(6)) */}
      <RecentEventsSection events={recentEvents} />

      {/* 4. Gallery Section (Static) */}
      <GallerySection />

      {/* 5. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
