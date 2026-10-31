import React from 'react';
import Link from 'next/link';
import { ArrowRight, HeartHandshake, Sparkles, Users } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
           

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.15]">
              Together We Heal, <br />
              <span className="text-primary">Together We Grow</span>
            </h1>

            <p className="text-base sm:text-lg text-foreground-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join hands with compassionate volunteers across the country. Create, join, and support grassroots social service events—from winter clothes distribution to environmental tree plantation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-base transition-all shadow-lg shadow-primary/25 cursor-pointer"
              >
                <span>Explore Upcoming Events</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/create-event"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-border bg-surface hover:bg-surface-secondary text-foreground font-semibold text-base transition-all cursor-pointer shadow-sm"
              >
                <HeartHandshake className="w-5 h-5 text-primary" />
                <span>Host an Event</span>
              </Link>
            </div>

            {/* Quick Impact Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-foreground">1,250+</p>
                <p className="text-xs text-foreground-muted">Volunteers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">180+</p>
                <p className="text-xs text-foreground-muted">Events Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">45k+</p>
                <p className="text-xs text-foreground-muted">Lives Impacted</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-surface">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"
                alt="Volunteers sharing warm food and blankets with the community"
                className="w-full h-[400px] lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="bg-surface/90 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-5 text-foreground max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Winter Blanket Distribution</h4>
                      <p className="text-xs text-foreground-muted">Mohammadpur, Dhaka</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

