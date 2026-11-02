'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Logo } from '@/components/common/Logo';
import {
  Calendar,
  PlusCircle,
  FolderKanban,
  CheckCircle2,
  LogOut,
  LogIn,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const isActive = (path: string): boolean => pathname === path;

  // Auto-close menus on page/route transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll and listen for ESC key when mobile menu is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const getMobileLinkClass = (path: string): string => {
    const active = isActive(path);
    return `group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
      active
        ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary pl-3 shadow-xs'
        : 'text-foreground hover:bg-surface-secondary hover:text-primary hover:translate-x-1'
    }`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Name */}
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/events"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive('/events')
                    ? 'text-primary font-semibold'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Upcoming Events</span>
              </Link>
            </nav>

            {/* Right Action Area */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* Auth Conditional Section */}
              {loading ? (
                <div className="w-24 h-9 bg-surface-secondary rounded-lg animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-3">
                  {/* Profile Picture with Dropdown */}
                  <div className="relative">
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-primary/30 hover:border-primary transition-all p-0.5"
                      />
                      {/* Tooltip on hover showing display name */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-surface-secondary text-foreground text-xs px-2.5 py-1 rounded shadow-lg whitespace-nowrap border border-border pointer-events-none z-50">
                        {user.displayName}
                      </div>
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setDropdownOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                          <div className="px-4 py-2 border-b border-border">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {user.displayName}
                            </p>
                            <p className="text-xs text-foreground-muted truncate">
                              {user.email}
                            </p>
                          </div>

                          <Link
                            href="/create-event"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-surface-secondary hover:text-primary transition-colors"
                          >
                            <PlusCircle className="w-4 h-4 text-primary" />
                            <span>Create Event</span>
                          </Link>

                          <Link
                            href="/manage-events"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-surface-secondary hover:text-primary transition-colors"
                          >
                            <FolderKanban className="w-4 h-4 text-primary" />
                            <span>Manage Events</span>
                          </Link>

                          <Link
                            href="/joined-events"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-surface-secondary hover:text-primary transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span>Joined Events</span>
                          </Link>

                          <div className="border-t border-border mt-1 pt-1">
                            <button
                              onClick={() => {
                                setDropdownOpen(false);
                                logout();
                              }}
                              className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-foreground-muted hover:text-red-500 rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors shadow-sm cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Actions: Theme Toggle + Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  mobileMenuOpen
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-surface-secondary'
                }`}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay (Fixed Blur & Dimming - Closes on click) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/60 backdrop-blur-md z-40 md:hidden animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Floating Overlay Menu (Overlaps page content, 0 layout shift) */}
      {mobileMenuOpen && (
        <div
          className="fixed top-16 inset-x-0 bg-surface/95 backdrop-blur-2xl border-b border-border shadow-2xl z-50 md:hidden max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <div className="max-w-7xl mx-auto px-4 py-5 space-y-4">
            {/* User Profile Card (if authenticated) */}
            {user && (
              <div className="flex items-center gap-3.5 p-3.5 bg-surface-secondary/80 border border-border/80 rounded-2xl shadow-xs">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-primary/40 p-0.5 shrink-0 bg-surface"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-foreground truncate">
                      {user.displayName}
                    </p>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-primary/15 text-primary shrink-0">
                      Volunteer
                    </span>
                  </div>
                  <p className="text-xs text-foreground-muted truncate mt-0.5">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links with Hover & Active Highlight States */}
            <div className="space-y-1">
              <Link
                href="/events"
                onClick={() => setMobileMenuOpen(false)}
                className={getMobileLinkClass('/events')}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Upcoming Events</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive('/events')
                      ? 'text-primary'
                      : 'text-foreground-muted/40 group-hover:text-primary group-hover:translate-x-0.5'
                  }`}
                />
              </Link>

              {user ? (
                <>
                  <Link
                    href="/create-event"
                    onClick={() => setMobileMenuOpen(false)}
                    className={getMobileLinkClass('/create-event')}
                  >
                    <div className="flex items-center gap-3">
                      <PlusCircle className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                      <span>Create Event</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive('/create-event')
                          ? 'text-primary'
                          : 'text-foreground-muted/40 group-hover:text-primary group-hover:translate-x-0.5'
                      }`}
                    />
                  </Link>

                  <Link
                    href="/manage-events"
                    onClick={() => setMobileMenuOpen(false)}
                    className={getMobileLinkClass('/manage-events')}
                  >
                    <div className="flex items-center gap-3">
                      <FolderKanban className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                      <span>Manage Events</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive('/manage-events')
                          ? 'text-primary'
                          : 'text-foreground-muted/40 group-hover:text-primary group-hover:translate-x-0.5'
                      }`}
                    />
                  </Link>

                  <Link
                    href="/joined-events"
                    onClick={() => setMobileMenuOpen(false)}
                    className={getMobileLinkClass('/joined-events')}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                      <span>Joined Events</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive('/joined-events')
                          ? 'text-primary'
                          : 'text-foreground-muted/40 group-hover:text-primary group-hover:translate-x-0.5'
                      }`}
                    />
                  </Link>
                </>
              ) : null}
            </div>

            {/* Bottom Actions: Logout or Login */}
            <div className="pt-2 border-t border-border">
              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="group flex items-center justify-between w-full px-3.5 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Logout</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-500/40 group-hover:text-red-500 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login / Register</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
