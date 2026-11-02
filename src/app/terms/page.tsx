import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, Users, AlertTriangle, Scale, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service & Volunteer Guidelines | CareConnect',
  description: 'Understand the rules, volunteer commitments, and community guidelines for participating on CareConnect.',
};

export default function TermsOfServicePage() {
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
            <Scale className="w-4 h-4" />
            <span>Community Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Terms of Service & Community Guidelines
          </h1>
          <p className="text-sm text-foreground-muted mt-2">
            Last updated: {lastUpdated} • Please read these terms carefully before hosting or volunteering for initiatives.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              By accessing or creating an account on CareConnect, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you should refrain from using the platform.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-foreground">2. Organizer Responsibilities</h2>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Individuals or community groups creating events on CareConnect must adhere to the following standards:
            </p>
            <ul className="space-y-2 text-sm text-foreground-muted list-disc list-inside pl-2">
              <li><strong className="text-foreground">Future Date Enforcement:</strong> All published events must have an active future date. The platform strictly prohibits past-dated submissions.</li>
              <li><strong className="text-foreground">Accurate Details:</strong> Event titles, descriptions, categories, and venue locations must reflect genuine social welfare activities (e.g., Cleanups, Tree Plantations, Clothing Distributions, Medical Camps).</li>
              <li><strong className="text-foreground">Safety & Logistics:</strong> Organizers are solely responsible for ensuring the physical safety, legal permissions, and transparent execution of their on-ground initiatives.</li>
              <li><strong className="text-foreground">Owner Authority:</strong> Only the original event creator may modify or cancel an event through their authorized dashboard.</li>
            </ul>
          </div>

          {/* Section 3 - Volunteer Code of Conduct (Workable & Anchorable) */}
          <div id="volunteer-conduct" className="bg-surface rounded-2xl border-2 border-primary/30 p-6 sm:p-8 space-y-4 shadow-sm relative scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">3. Volunteer Code of Conduct</h2>
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">Commitment to Ethical Social Action</span>
              </div>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              CareConnect is built upon trust, mutual respect, and altruism. Every registered volunteer agrees to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-foreground font-medium">Honor commitments and notify organizers promptly if unable to attend</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-foreground font-medium">Treat all fellow volunteers, organizers, and beneficiaries with dignity and respect</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-foreground font-medium">Zero tolerance for harassment, discrimination, or hate speech of any kind</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-foreground font-medium">Follow safety instructions provided by organizers at event venues</span>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-foreground">4. Prohibited Activities & Account Termination</h2>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              CareConnect reserves the right to immediately suspend or permanently delete any account or event that engages in:
            </p>
            <ul className="space-y-2 text-sm text-foreground-muted list-disc list-inside pl-2">
              <li>Posting commercial advertisements, misleading fundraisers, or political propaganda masquerading as social welfare.</li>
              <li>Attempting to manipulate or spam the platform with automated scripts or duplicate accounts.</li>
              <li>Uploading offensive, explicit, or copyright-infringing media as event thumbnails.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-foreground">5. Limitation of Liability</h2>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              CareConnect acts solely as a coordination bridge connecting community volunteers with social event organizers. We do not supervise physical activities on-site and cannot be held liable for personal injuries, damages, or disputes arising during offline events. Participants join and volunteer at their own discretion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
