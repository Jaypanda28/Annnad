import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Building2, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-12 h-12 rounded-full bg-light-bg flex items-center justify-center text-charcoal-muted">
        404
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold text-navy">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          The requested page could not be located. You can return to the homepage or find essential clinic details below.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy text-white font-semibold hover:bg-navy-light transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/clinic"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-subtle bg-white text-charcoal font-semibold hover:bg-light-bg transition-colors"
        >
          <Building2 className="w-3.5 h-3.5 text-teal" />
          <span>New Life Clinic</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-subtle bg-white text-charcoal font-semibold hover:bg-light-bg transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-medical" />
          <span>Contact Page</span>
        </Link>
      </div>
    </div>
  );
}
