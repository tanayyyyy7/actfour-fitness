import React, { useState, useContext } from 'react';
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserContext } from './contexts/UserContext';

const data = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 },
];

export default function CalorieGoalDialog({ open, onOpenChange }) {
  const { user, updateUser } = useContext(UserContext);
  const defaultGoal = user.calorieGoal ?? 2000;
  const [goal, setGoal] = useState(defaultGoal || 1800);

  function onClick(adjustment) {
    setGoal(Math.max(200, Math.min(3000, goal + adjustment)));
  }

  const handleSubmit = () => {
    updateUser({ ...user, calorieGoal: goal });
    onOpenChange(false);
  };

  const handleCancel = () => {
    updateUser({ ...user, calorieGoal: 1800 });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Set Calorie Goal</DialogTitle>
          <DialogDescription className="text-muted-foreground">Set your daily calorie burn goal.</DialogDescription>
        </DialogHeader>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => onClick(-100)}
              disabled={goal <= 200}
            >
              <MinusIcon className="h-6 w-6" />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="flex-1 text-center">
              <div className="text-7xl font-bold tracking-tighter">
                {goal}
              </div>
              <div className="text-sm uppercase text-muted-foreground">
                Calories/day
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => onClick(100)}
              disabled={goal >= 3000}
            >
              <PlusIcon className="h-6 w-6" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          <div className="mt-6 h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="goal"
                  fill="hsl(var(--primary))"
                  opacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <DialogFooter className="sm:justify-between gap-y-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}