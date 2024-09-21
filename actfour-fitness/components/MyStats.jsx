// src/components/MyStats.jsx

import React, { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';

export default function MyStats({ onClose }) {
  const { user, updateUser } = useContext(UserContext);
  const { toast } = useToast();
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
    toast({
      title: 'Stats updated successfully',
      description: 'Your stats have been updated successfully.',
      variant: 'default',
      duration: 2000,
    });
    onClose();
  };

  return (
    <div>
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
     
        <Button variant="outline" className="mt-4" onClick={() => onClose()}>Back to Home</Button>
    </div>
  );
}