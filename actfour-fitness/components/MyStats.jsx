<<<<<<< HEAD
// src/components/MyStats.jsx
=======

>>>>>>> 97a64a4 (added responsive UI for components)
import React, { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MyStats() {
  const { user, updateUser } = useContext(UserContext);
  const [stats, setStats] = useState({
    weight: user.weight,
    height: user.height,
    goalWeight: user.goalWeight
  });

  const handleChange = (e) => {
    setStats({ ...stats, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(stats);
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-semibold mb-4">My Stats</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            value={stats.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            name="height"
            type="number"
            value={stats.height}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
          <Input
            id="goalWeight"
            name="goalWeight"
            type="number"
            value={stats.goalWeight}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Update Stats</Button>
      </form>
      <Link to="/">
        <Button variant="outline" className="mt-4">Back to Home</Button>
      </Link>
    </div>
  );
}