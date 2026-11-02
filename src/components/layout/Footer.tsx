import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" />
            <p className="text-sm text-foreground-muted leading-relaxed">
              Empowering local communities to organize, join, and support impactful social development initiatives across the country.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* X Logo */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-surface-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                aria-label="Follow us on X"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-surface-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-surface-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-foreground-muted">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-primary transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="hover:text-primary transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="hover:text-primary transition-colors">
                  Manage Events
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-primary transition-colors">
                  Joined Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Event Categories with Direct Filters */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Popular Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-foreground-muted">
              <li>
                <Link
                  href="/events?category=Donation"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Donation & Relief</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/events?category=Plantation"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Tree Plantation Drives</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/events?category=Cleanup"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Community Cleanups</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/events?category=Healthcare"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Healthcare & Medical</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/events?category=Education"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Education & Books</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Contact & Help
            </h3>
            <ul className="space-y-3 text-sm text-foreground-muted">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Dhanmondi, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:noorealom1997@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  noorealom1997@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:+8801780743453"
                  className="hover:text-primary transition-colors"
                >
                  +880 1780-743453
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar with Active Legal Links */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-foreground-muted gap-4">
          <p>© 2026 CareConnect Platform. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Terms of Service
            </Link>
            <Link
              href="/terms#volunteer-conduct"
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Volunteer Guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
