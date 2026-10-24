import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-10 h-10 border-3 border-teal/20 border-t-teal rounded-full animate-spin" />
      <p className="text-xs font-medium text-charcoal-muted tracking-wide">
        Loading Dr. Abhishek Anand Website...
      </p>
    </div>
  );
}
