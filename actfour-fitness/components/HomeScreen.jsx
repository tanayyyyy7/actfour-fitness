// src/components/HomeScreen.jsx
import React, { useState, useContext } from 'react';
import { format, subDays, addDays, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ProgressCard from './ProgressCard';
import ActivityLog from './ActivityLog';
import { ActivityContext } from './contexts/ActivityContext';
import { UserContext } from './contexts/UserContext';
import { ModeToggle } from '@/components/mode-toggle';
import { useToast } from '@/hooks/use-toast';
import LogStepsDialog from './LogStepsDialog';
import LogActivityDialog from './LogActivityDialog';

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { activities, getTotalCaloriesBurned, getTotalSteps } = useContext(ActivityContext);
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const [isLogStepsOpen, setIsLogStepsOpen] = useState(false);
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);

  const handlePrevDay = () => setCurrentDate(subDays(currentDate, 1));
  const handleNextDay = () => setCurrentDate(addDays(currentDate, 1));

  const totalCalories = getTotalCaloriesBurned(currentDate);
  const totalSteps = getTotalSteps(currentDate);

  const filteredActivities = activities.filter(activity =>
    format(new Date(activity.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
  );

  const handleLogStepsClick = () => {
    if (isToday(currentDate)) {
      setIsLogStepsOpen(true);
    } else {
      toast({
        title: 'Error',
        description: 'You can only log steps for the current date.',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  const handleLogActivityClick = () => {
    if (isToday(currentDate)) {
      setIsLogActivityOpen(true);
    } else {
      toast({
        title: 'Error',
        description: 'You can only add activities for the current date.',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-w-screen mx-auto p-4 py-2 sm:p-6 lg:py-2 lg:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 py-4 border-b">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">ACT4 FITNESS</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link to="/my-stats">
            <Button variant="outline">My Stats</Button>
          </Link>
        </div>
      </header>

      <div className="flex justify-around items-center mb-6">
        <Button variant="outline" onClick={handlePrevDay} size='icon'><ChevronLeft className="h-4 w-4" /></Button>
        <h2 className="text-xl font-semibold">{format(currentDate, 'MMMM d, yyyy')}</h2>
        <Button variant="outline" onClick={handleNextDay} size='icon' ><ChevronRight className="h-4 w-4" /></Button>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <ActivityLog 
          activities={filteredActivities}
          handleLogStepsClick={handleLogStepsClick}
          handleLogActivityClick={handleLogActivityClick}
          isToday={isToday(currentDate)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProgressCard title="Steps" current={totalSteps} goal={10000} unit="steps" />
          <ProgressCard title="Calories Burnt" current={totalCalories} goal={2000} unit="cal" />
          <ProgressCard
            title="Goal Weight"
            current={user.weight}
            goal={user.goalWeight}
            unit="kg"
            reverse={true}
          />
        </div>
      </div>
      <Link to="/full-activity-log">
        <Button variant="outline" className="w-full sm:w-auto">View Full Activity Log</Button>
      </Link>

      {/* Render dialog components */}
      <LogStepsDialog
        isOpen={isLogStepsOpen}
        onOpenChange={setIsLogStepsOpen}
      />
      <LogActivityDialog
        isOpen={isLogActivityOpen}
        onOpenChange={setIsLogActivityOpen}
      />
    </div>
  );
}