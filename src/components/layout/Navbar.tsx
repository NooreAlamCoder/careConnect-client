'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Logo } from '@/components/common/Logo';
import {
  Heart,
  Calendar,
  PlusCircle,
  FolderKanban,
  CheckCircle2,
  LogOut,
  LogIn,
  Menu,
  X,
  User as UserIcon,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const isActive = (path: string): boolean => pathname === path;

  return (
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

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-surface-secondary transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-4 pt-2 pb-4 space-y-3">
          <Link
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-surface-secondary text-foreground"
          >
            <Calendar className="w-4 h-4 text-primary" />
            <span>Upcoming Events</span>
          </Link>

          {user ? (
            <>
              <div className="px-3 py-2 bg-surface-secondary rounded-lg">
                <p className="text-sm font-semibold text-foreground">{user.displayName}</p>
                <p className="text-xs text-foreground-muted">{user.email}</p>
              </div>
              <Link
                href="/create-event"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-surface-secondary text-foreground"
              >
                <PlusCircle className="w-4 h-4 text-primary" />
                <span>Create Event</span>
              </Link>
              <Link
                href="/manage-events"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-surface-secondary text-foreground"
              >
                <FolderKanban className="w-4 h-4 text-primary" />
                <span>Manage Events</span>
              </Link>
              <Link
                href="/joined-events"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-surface-secondary text-foreground"
              >
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Joined Events</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

