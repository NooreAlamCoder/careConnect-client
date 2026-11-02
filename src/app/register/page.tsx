'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  // Dynamic Real-time Password Rules
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

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
      // Simplified registration without photo friction; uses personalized DiceBear avatar
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`;

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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background selection:bg-primary selection:text-white">
      {/* Top Header with Clickable Logo & Theme Toggle */}
      <div className="w-full max-w-md flex items-center justify-between mb-3 px-1">
        <Logo size="md" href="/" />
        <ThemeToggle />
      </div>

      {/* Main Register Card */}
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl">
        <div className="text-center mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Create an Account</h1>
          <p className="text-xs sm:text-sm text-foreground-muted mt-1">
            Join thousands of volunteers making a tangible difference
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3.5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border bg-surface-secondary text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border bg-surface-secondary text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
              />
            </div>
          </div>

          {/* Password with Visibility Toggle */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a secure password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-surface-secondary text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Real-time Password Requirements Checklist */}
            {password.length > 0 && (
              <div className="mt-2 p-2.5 rounded-xl bg-surface-secondary/70 border border-border/60 space-y-1">
                <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Password must contain:
                </p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                  <div
                    className={`flex items-center gap-1.5 transition-colors ${
                      hasMinLength ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        hasMinLength ? 'text-emerald-500' : 'text-slate-400/60 dark:text-slate-600'
                      }`}
                    />
                    <span>6+ characters</span>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 transition-colors ${
                      hasUppercase ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        hasUppercase ? 'text-emerald-500' : 'text-slate-400/60 dark:text-slate-600'
                      }`}
                    />
                    <span>1 uppercase letter</span>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 transition-colors ${
                      hasLowercase ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        hasLowercase ? 'text-emerald-500' : 'text-slate-400/60 dark:text-slate-600'
                      }`}
                    />
                    <span>1 lowercase letter</span>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 transition-colors ${
                      hasNumber ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        hasNumber ? 'text-emerald-500' : 'text-slate-400/60 dark:text-slate-600'
                      }`}
                    />
                    <span>1 number</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-primary/20 cursor-pointer disabled:opacity-50 mt-3"
          >
            <span>{submitting ? 'Creating Account...' : 'Register'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-foreground-muted mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
