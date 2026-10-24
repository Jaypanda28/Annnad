"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold text-navy">Something went wrong</h1>
        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          An unexpected error occurred while loading this page. Please try again or return to the homepage.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2 text-xs">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy text-white font-semibold hover:bg-navy-light transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-subtle bg-white text-charcoal font-semibold hover:bg-light-bg transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Homepage</span>
        </Link>
      </div>
    </div>
  );
}
