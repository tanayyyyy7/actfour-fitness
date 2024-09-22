import React from 'react';
export default function SuspenseFallback() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <p className="text-3xl text-primary font-bold mb-8">ACT4 FITNESS</p>
      <p className="mt-8 text-foreground text-lg animate-pulse">Loading your fitness journey...</p>
    </div>
  );
}