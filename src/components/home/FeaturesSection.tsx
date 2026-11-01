import React from 'react';
import { CalendarCheck, ShieldCheck, Users, Flame } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <CalendarCheck className="w-6 h-6 text-primary" />,
      title: 'Easy Event Hosting',
      description:
        'Launch community service drives with verified locations, future date scheduling, and automated participant tracking in minutes.',
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: 'One-Click Participation',
      description:
        'Browse local initiatives—from plantation to clothes donation—and join instantly with your volunteer profile.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: 'Secure & Verified Records',
      description:
        'Protected JWT authorization ensures creators retain full control over editing and managing their event listings.',
    },
    {
      icon: <Flame className="w-6 h-6 text-primary" />,
      title: 'Real-time Impact Updates',
      description:
        'Track all events you have participated in, sorted chronologically with live updates and community reviews.',
    },
  ];

  return (
    <section className="py-20 bg-surface border-y border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
            Why CareConnect
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Designed for Real Social Change
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted mt-3">
            Every feature is carefully engineered to eliminate friction between passionate organizers and dedicated volunteers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-background rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

