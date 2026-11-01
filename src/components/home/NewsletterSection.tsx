'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    toast.success('Thank you for subscribing to our community bulletin!');
    setEmail('');
  };

  return (
    <section className="py-20 bg-background transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/15 via-surface to-surface border border-border p-8 sm:p-14 shadow-xl">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Stay Connected With Local Causes
            </h2>

            <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
              Receive a monthly digest of upcoming social events, volunteer highlights, and emergency relief drives in your city.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 p-4 rounded-2xl bg-primary/10 text-primary font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>You are subscribed! We will keep you posted on verified drives.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2"
              >
                <div className="relative w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-all shadow-md shadow-primary/20 shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-xs text-foreground-muted pt-2">
              We respect your privacy. No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

