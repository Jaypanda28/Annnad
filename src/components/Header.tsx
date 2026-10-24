"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ShieldCheck, ChevronRight, Lock } from "lucide-react";
import DoctorApprovalModal from "./DoctorApprovalModal";
import Phase2RoadmapModal from "./Phase2RoadmapModal";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isPhase2Open, setIsPhase2Open] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Surgical Services", href: "/services" },
    { label: "Parent Information", href: "/parent-information" },
    { label: "New Life Clinic", href: "/clinic" },
    { label: "Contact", href: "/contact" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Discreet Doctor & Concept Review Top Ribbon */}
      <aside aria-label="Review banner" className="bg-navy-dark text-slate-300 text-xs border-b border-navy-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="font-medium text-white tracking-wide">
              JOVIX Review Concept
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">
              Prepared for Dr. Abhishek Anand, Paediatric Surgeon
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsChecklistOpen(true)}
              className="inline-flex items-center gap-1 text-teal-light hover:text-white font-medium transition-colors cursor-pointer"
              title="View verification status of credentials and clinic details"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal" />
              <span>Doctor Verification Checklist</span>
            </button>
            <span className="text-slate-600 hidden md:inline">|</span>
            <button
              onClick={() => setIsPhase2Open(true)}
              className="text-slate-400 hover:text-slate-200 transition-colors hidden md:inline cursor-pointer"
            >
              Phase 2 CMS Roadmap
            </button>
          </div>
        </div>
      </aside>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-warm-white/95 backdrop-blur-md border-b border-border-subtle shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Identity */}
          <Link 
            href="/" 
            className="flex flex-col group focus-visible:outline-hidden"
            aria-label="Dr. Abhishek Anand Home"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-navy group-hover:text-medical transition-colors">
              Dr. Abhishek Anand
            </span>
            <span className="text-xs sm:text-sm font-medium text-charcoal-muted tracking-wide flex items-center gap-1.5">
              <span>Paediatric Surgeon</span>
              <span className="text-border-subtle">•</span>
              <span className="text-teal font-medium">New Life Clinic, Bhubaneswar</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    active
                      ? "text-navy bg-light-bg font-semibold"
                      : "text-charcoal hover:text-navy hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/clinic-login"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-navy bg-light-bg hover:bg-slate-200 border border-border-subtle transition-all"
              title="Access Clinic Management System"
            >
              <Lock className="w-3.5 h-3.5 text-medical" />
              <span>Staff Portal</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-medical hover:bg-medical-hover shadow-xs hover:shadow-editorial transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Contact the Clinic</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/clinic-login"
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-navy bg-light-bg border border-border-subtle text-xs font-bold"
              aria-label="Staff Portal"
            >
              <Lock className="w-4 h-4 text-medical" />
            </Link>
            <Link
              href="/contact"
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-medical bg-medical-light"
              aria-label="Call clinic"
            >
              <Phone className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-charcoal hover:text-navy hover:bg-light-bg transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border-subtle bg-warm-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
            <nav className="space-y-1" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "text-navy bg-light-bg font-semibold border-l-4 border-medical"
                        : "text-charcoal hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-border-subtle space-y-2.5">
              <Link
                href="/clinic-login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-navy bg-light-bg hover:bg-slate-200 border border-border-subtle transition-colors"
              >
                <Lock className="w-4 h-4 text-medical" />
                <span>Clinic Staff Login (CMS)</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-medical hover:bg-medical-hover transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Contact New Life Clinic</span>
              </Link>

              <div className="flex items-center justify-between pt-2 text-xs">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsChecklistOpen(true);
                  }}
                  className="text-teal font-medium hover:underline inline-flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Doctor Verification Checklist
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsPhase2Open(true);
                  }}
                  className="text-charcoal-muted hover:text-navy"
                >
                  Phase 2 CMS Roadmap
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <DoctorApprovalModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
      <Phase2RoadmapModal
        isOpen={isPhase2Open}
        onClose={() => setIsPhase2Open(false)}
      />
    </>
  );
}
