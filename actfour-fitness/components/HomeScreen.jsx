// HomeScreen.jsx
import React, { useState, useContext } from 'react';
import { format, subDays, addDays, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ActivityContext } from './contexts/ActivityContext';
import { UserContext } from './contexts/UserContext';
import { ModeToggle } from '@/components/mode-toggle';
import { useToast } from '@/hooks/use-toast';
import AddActivity from './AddActivity';
import LogSteps from './LogSteps';

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { activities, getTotalCaloriesBurned, getTotalSteps } = useContext(ActivityContext);
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isLogStepsOpen, setIsLogStepsOpen] = useState(false);

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
      setIsAddActivityOpen(true);
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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">ACT4 FITNESS</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link to="/my-stats">
            <Button variant="outline">My Stats</Button>
          </Link>
        </div>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={handlePrevDay} size='icon'><ChevronLeft className="h-4 w-4" /></Button>
        <h2 className="text-xl font-semibold">{format(currentDate, 'MMMM d, yyyy')}</h2>
        <Button variant="outline" onClick={handleNextDay} size='icon' ><ChevronRight className="h-4 w-4" /></Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="border p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Calories</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </TableCell>
                    <TableCell>
                      {!activity.duration ? "-" : activity.duration + ' min'}
                    </TableCell>
                    <TableCell>
                      {activity.caloriesBurned.toFixed(2)} cal
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Dialog open={isLogStepsOpen} onOpenChange={setIsLogStepsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto" onClick={handleLogStepsClick}>
                  <Plus className="h-4 w-4 mr-2" />
                  Log Steps
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Steps</DialogTitle>
                  <DialogDescription>
                    Enter the number of steps you've taken today.
                  </DialogDescription>
                </DialogHeader>
                <LogSteps onClose={() => setIsLogStepsOpen(false)} />
              </DialogContent>
            </Dialog>
            <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto" onClick={handleLogActivityClick}>
                  <Plus className="h-4 w-4 mr-2" />
                  Log Activity
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Activity</DialogTitle>
                  <DialogDescription>
                    Select an activity and enter its duration.
                  </DialogDescription>
                </DialogHeader>
                <AddActivity onClose={() => setIsAddActivityOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

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
      <Link to="/activity-log">
        <Button variant="outline" className="w-full sm:w-auto">View Full Activity Log</Button>
      </Link>
    </div>
  );
}

export function ProgressCard({ title, current, goal, unit, reverse = false }) {
  const percentage = reverse
    ? ((goal - current) / (goal - Math.min(current, goal))) * 100
    : (current / goal) * 100;

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-3xl font-bold mb-2">
        {current.toFixed(1)} <span className="text-sm font-normal">/ {goal} {unit}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}