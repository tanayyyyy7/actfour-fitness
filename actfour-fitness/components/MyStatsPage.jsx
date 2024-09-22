// src/pages/MyStatsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import MyStats from './MyStats';

export default function MyStatsPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Stats</h1>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </header>
      <MyStats />
    </div>
  );
}