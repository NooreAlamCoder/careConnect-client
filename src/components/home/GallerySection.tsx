import React from 'react';
import { Camera } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const photos = [
    {
      src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      caption: 'Winter Clothes Distribution in Mirpur',
      category: 'Donation',
    },
    {
      src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      caption: '10,000 Tree Plantation Campaign',
      category: 'Plantation',
    },
    {
      src: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
      caption: 'City Lake Cleanup & Plastic Removal',
      category: 'Cleanup',
    },
    {
      src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      caption: 'Educational Supplies for Underprivileged Kids',
      category: 'Education',
    },
    {
      src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      caption: 'Free Medical Checkup & Medicine Drive',
      category: 'Healthcare',
    },
    {
      src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
      caption: 'Youth Volunteer Training Camp',
      category: 'Community',
    },
  ];

  return (
    <section className="py-20 bg-surface border-y border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Moments of Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Community in Action
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted mt-2">
            A glimpse into the smiles, hard work, and transformations brought by our volunteers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden border border-border bg-surface-secondary aspect-[4/3] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary-light">
                  {item.category}
                </span>
                <p className="text-sm font-semibold mt-1 leading-snug">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

