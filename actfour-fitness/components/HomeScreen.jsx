import React, { useState, useContext, useEffect } from 'react';
import { format, subDays, addDays, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ProgressCard from './ProgressCard';
import ActivityLog from './ActivityLog';
import { ActivityContext } from './contexts/ActivityContext';
import { UserContext } from './contexts/UserContext';
import { ModeToggle } from '@/components/mode-toggle';
import { useToast } from '@/hooks/use-toast';
import LogStepsDialog from './LogStepsDialog';
import LogActivityDialog from './LogActivityDialog';
import CalorieGoalDialog from './CalorieGoalDialog';

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { activities, getTotalCaloriesBurned, getTotalSteps } = useContext(ActivityContext);
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLogStepsOpen, setIsLogStepsOpen] = useState(false);
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const [isCalorieGoalOpen, setIsCalorieGoalOpen] = useState(false);

  const handlePrevDay = () => setCurrentDate(subDays(currentDate, 1));
  const handleNextDay = () => setCurrentDate(addDays(currentDate, 1));

  const totalCalories = getTotalCaloriesBurned(currentDate);
  const totalSteps = getTotalSteps(currentDate);

  const filteredActivities = activities.filter(activity =>
    format(new Date(activity.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
  );

  const handleLogStepsClick = () => {

    if(user.calorieGoal && isToday(currentDate)) {
      setIsLogStepsOpen(true);
    } else if(user.calorieGoal && !isToday(currentDate)) {
      toast({
        title: 'Error',
        description: 'You can only log steps for the current date.',
        variant: 'destructive',
        duration: 2000,
      });
    }else if(!user.calorieGoal && isToday(currentDate)) {
      toast({
        title: 'Error',
        description: 'You have not set your calorie goal.',
        variant: 'destructive',
        duration: 2000,
      });
    }
    else if(!user.calorieGoal && !isToday(currentDate)) {
      toast({
        title: 'Error',
        description: 'You have not set your calorie goal & You can only log steps for the current date.',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  const handleLogActivityClick = () => {
    if(user.calorieGoal && isToday(currentDate)) {
      setIsLogActivityOpen(true);
    } else if(user.calorieGoal && !isToday(currentDate)) {
      toast({
        title: 'Error',
        description: 'You can only add activities for the current date.',
        variant: 'destructive',
        duration: 2000,
      });
    }else if(!user.calorieGoal && isToday(currentDate)) {
      toast({
        title: 'Error',
        description: 'You have not set your calorie goal.',
        variant: 'destructive',
        duration: 2000,
      });
    }
    else if(!user.calorieGoal && !isToday(currentDate)) {
      toast({
        title: 'Error',
        description: 'You have not set your calorie goal & You can only add activities for the current date.',
        variant: 'destructive',
        duration: 2000,
      });
    }
  }

  const handleSetCalorieGoal = () => {
    if (!user.calorieGoal) {
      setIsCalorieGoalOpen(true);
    } else {
      toast({
        title: 'Error',
        description: 'You have already set your calorie goal.',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-w-screen p-4 py-2 sm:p-6 lg:py-2 lg:p-8">
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
        <Button variant="default" onClick={handlePrevDay} size='icon'><ChevronLeft className="h-4 w-4" /></Button>
        <h2 className="text-xl font-semibold">{format(currentDate, 'MMMM d, yyyy')}</h2>
        <Button variant="default" onClick={handleNextDay} size='icon' ><ChevronRight className="h-4 w-4" /></Button>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <ActivityLog
          activities={filteredActivities}
          handleLogStepsClick={handleLogStepsClick}
          handleLogActivityClick={handleLogActivityClick}
          isToday={isToday(currentDate)}
        />
       <div className='text-lg mb-4 flex flex-row justify-between'>
        <Button className="w-fit" onClick={() => navigate('/full-activity-log')}>
          Full Activity Log
        </Button>
        <Button variant="default" className="w-fit" onClick={handleSetCalorieGoal} disabled={!isToday(currentDate)}>Set Calorie Goal</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProgressCard title="Steps" current={totalSteps} goal={10000} unit="steps" />
          <ProgressCard title="Calories Burnt" current={totalCalories} goal={user.calorieGoal} unit="cal" />
          <ProgressCard
            title="Goal Weight"
            current={user.weight}
            goal={user.goalWeight}
            unit="kg"
            reverse={true}
          />
        </div>
      </div>

      {/* Render dialog components */}
      <LogStepsDialog
        isOpen={isLogStepsOpen}
        onOpenChange={setIsLogStepsOpen}
      />
      <LogActivityDialog
        isOpen={isLogActivityOpen}
        onOpenChange={setIsLogActivityOpen}
      />
      <CalorieGoalDialog
        open={isCalorieGoalOpen}
        onOpenChange={setIsCalorieGoalOpen}
      />
    </div>
  );
}