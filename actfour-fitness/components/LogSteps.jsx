// LogSteps.jsx
import React, { useContext, useState } from 'react';
import { ActivityContext } from './contexts/ActivityContext';
import { UserContext } from './contexts/UserContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LogSteps({ onClose }) {
  const { addSteps } = useContext(ActivityContext);
  const { user } = useContext(UserContext);
  const [steps, setSteps] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepsCount = parseInt(steps);
    const strideLength = user.height * 0.413; // in cm
    const distanceWalked = (stepsCount * strideLength) / 100000; // in km
    const caloriesBurned = stepsCount * 0.04;
    addSteps(stepsCount, distanceWalked, caloriesBurned);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="steps">Number of Steps</Label>
        <Input
          id="steps"
          type="number"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Log Steps</Button>
    </form>
  );
}

export default LogSteps;