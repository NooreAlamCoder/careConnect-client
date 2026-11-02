import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, Eye, Database, Bell, CheckCircle2, Mail } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CareConnect',
  description: 'Learn how CareConnect collects, protects, and manages your personal data and volunteer information.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'November 2, 2026';

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal & Data Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-foreground-muted mt-2">
            Last updated: {lastUpdated} • Effective immediately for all registered organizers and volunteers.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-foreground">1. Information We Collect</h2>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              When you use CareConnect to organize or join social welfare drives, we collect the necessary information to facilitate coordination:
            </p>
            <ul className="space-y-2 text-sm text-foreground-muted list-disc list-inside pl-2">
              <li><strong className="text-foreground">Account Information:</strong> Name, email address, profile picture (via Google OAuth or auto-generated DiceBear avatars), and encrypted password hashes.</li>
              <li><strong className="text-foreground">Event Organizer Data:</strong> Event titles, descriptions, categories (Cleanup, Plantation, Donation, Healthcare, Education), venue locations, schedules, and uploaded banner media.</li>
              <li><strong className="text-foreground">Volunteer Commitments:</strong> Records of events you sign up for, registration timestamps, and participation status.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-foreground">2. How We Use Your Data</h2>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              We strictly utilize your data to operate the CareConnect platform and provide genuine community value:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-foreground font-medium">To coordinate volunteers and event organizers in real-time</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-foreground font-medium">To verify and enforce creator-only event management security</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-foreground font-medium">To prevent duplicate volunteer sign-ups for the same event</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-foreground font-medium">To maintain platform security, prevent spam, and enforce community standards</span>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-foreground">3. Security & Data Protection</h2>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              We employ strict, industry-standard security protocols to safeguard your credentials and event records:
            </p>
            <ul className="space-y-2 text-sm text-foreground-muted list-disc list-inside pl-2">
              <li><strong className="text-foreground">Authentication:</strong> Built using Better Auth with secure HTTP-only cookies and cryptographically signed JWT authorization headers.</li>
              <li><strong className="text-foreground">Encryption:</strong> All network communication is enforced via TLS/SSL encryption across both client and API server.</li>
              <li><strong className="text-foreground">Database Safeguards:</strong> Hosted on MongoDB Atlas with IP access restrictions, connection pooling, and automated database backups.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-foreground">4. User Rights & Account Control</h2>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Every participant on CareConnect retains full ownership and control over their content:
            </p>
            <ul className="space-y-2 text-sm text-foreground-muted list-disc list-inside pl-2">
              <li><strong className="text-foreground">Edit & Delete:</strong> Organizers can update or remove any event they hosted via the <Link href="/manage-events" className="text-primary underline">Manage Events</Link> panel.</li>
              <li><strong className="text-foreground">Review Participations:</strong> Volunteers can inspect all initiatives they committed to via the <Link href="/joined-events" className="text-primary underline">Joined Events</Link> page.</li>
              <li><strong className="text-foreground">Account Deletion:</strong> You may request complete removal of your profile and data by contacting support.</li>
            </ul>
          </div>

          {/* Contact Box */}
          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-foreground">Have questions regarding your privacy?</h3>
              <p className="text-xs text-foreground-muted">
                Reach out to our Data Privacy & Community Coordination team anytime.
              </p>
            </div>
            <a
              href="mailto:noorealom1997@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors shrink-0 shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
