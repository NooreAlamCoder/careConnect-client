'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { User, Mail, Image, Lock, UserPlus, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  // Strict Password Validation Rule:
  // Must have an uppercase letter, a lowercase letter, and at least 6 characters
  const validatePassword = (pass: string): { valid: boolean; message: string } => {
    if (pass.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters long.' };
    }
    if (!/[A-Z]/.test(pass)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter.' };
    }
    if (!/[a-z]/.test(pass)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter.' };
    }
    return { valid: true, message: '' };
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const { valid, message } = validatePassword(password);
    if (!valid) {
      toast.error(message);
      return;
    }

    try {
      setSubmitting(true);
      const avatar =
        photoURL.trim() ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`;

      await login(email.trim(), name.trim(), avatar);
      toast.success('Registration successful! Welcome to CareConnect.');
      router.push('/events');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-surface border border-border rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-3">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create an Account</h1>
          <p className="text-sm text-foreground-muted mt-1">
            Join thousands of volunteers making a tangible difference
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
              Profile Photo URL (Optional)
            </label>
            <div className="relative">
              <Image className="w-5 h-5 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Must include 1 uppercase, 1 lowercase, 6+ chars"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <p className="text-[11px] text-foreground-muted mt-1.5">
              • Must contain at least 6 characters, 1 uppercase and 1 lowercase letter.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-medium text-sm transition-all shadow-md shadow-primary/20 cursor-pointer disabled:opacity-50 mt-4"
          >
            <span>{submitting ? 'Creating account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-sm text-foreground-muted mt-6">
          Already registered?{' '}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Log in instead
          </Link>
        </p>
      </div>
    </div>
  );
}

