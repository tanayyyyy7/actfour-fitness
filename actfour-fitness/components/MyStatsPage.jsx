import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import MyStats from './MyStats';
import { ModeToggle } from '@/components/mode-toggle';

export default function MyStatsPage() {
  return (
    <div className="min-w-screen p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Stats</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle />
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
        </div>
      </header>
      <MyStats />
    </div>
  );
}