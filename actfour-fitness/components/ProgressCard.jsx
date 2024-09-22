import React, { useContext } from 'react';
import { Progress } from "@/components/ui/progress";
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { UserContext } from "./contexts/UserContext";

export default function ProgressCard({ title, current=0, goal=0, unit, reverse = false }) {
  const { user } = useContext(UserContext);
  let percentage, displayPercentage, difference, icon;

  if (title === "Goal Weight") {
    const initialWeight = user.initialWeight;
    const totalWeightChange = Math.abs(initialWeight - goal);
    const currentWeightChange = Math.abs(initialWeight - current);
    percentage = (currentWeightChange / totalWeightChange) * 100;
    displayPercentage = Math.min(percentage, 100).toFixed(1);
    difference = Math.abs(current - goal).toFixed(1);

    if (goal < initialWeight) {
      // Weight loss goal
      reverse = false;
      icon = current > goal ? <ArrowDownIcon className="h-4 w-4 text-green-500" /> : <ArrowUpIcon className="h-4 w-4 text-red-500" />;
    } else {
      // Weight gain goal
      reverse = true;
      icon = current < goal ? <ArrowUpIcon className="h-4 w-4 text-green-500" /> : <ArrowDownIcon className="h-4 w-4 text-red-500" />;
    }
  } else {
    // For Steps and Calories
    percentage = (current / goal) * 100;
    displayPercentage = Math.min(percentage, 100).toFixed(1);
    difference = (goal - current).toFixed(1);
    icon = current < goal ? <ArrowUpIcon className="h-4 w-4 text-green-500" /> : <ArrowDownIcon className="h-4 w-4 text-red-500" />;
  }
  
  return (
    <div className="h-fit border p-4 rounded-lg shadow-md">
      <div className='flex justify-between mb-2'> 
      <h3 className="text-lg font-semibold ">{title}</h3>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-3xl font-bold">
          {current.toFixed(1)} <span className="text-sm font-normal">{unit}</span>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{isNaN(displayPercentage) ? 0 : displayPercentage}% complete</div>
          <div className="flex items-center text-sm">
            {icon}
            <span className="ml-1">{difference} {unit} to go</span>
          </div>
        </div>
      </div>
      <Progress value={parseFloat(displayPercentage)} className="h-2" />
      <div className="mt-2 text-sm text-muted-foreground">
        Goal: {goal} {unit}
      </div>

    </div>
  );
}