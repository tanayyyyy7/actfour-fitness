// HomeScreen component
import React, { useState, useContext } from 'react'
import { format, subDays, addDays } from 'date-fns'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ActivityContext } from './contexts/ActivityContext'
import { UserContext } from './contexts/UserContext'

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { getTotalCaloriesBurned, getTotalSteps } = useContext(ActivityContext)
  const { activities } = useContext(ActivityContext);
  const { user } = useContext(UserContext)

  const handlePrevDay = () => setCurrentDate(subDays(currentDate, 1))
  const handleNextDay = () => setCurrentDate(addDays(currentDate, 1))

  const totalCalories = getTotalCaloriesBurned()
  const totalSteps = getTotalSteps()

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ACT4 FITNESS</h1>
        <Link to="/my-stats">
          <Button variant="outline">My Stats</Button>
        </Link>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={handlePrevDay}><ChevronLeft className="h-4 w-4 mr-2" />Prev</Button>
        <h2 className="text-xl font-semibold">{format(currentDate, 'MMMM d, yyyy')}</h2>
        <Button variant="ghost" onClick={handleNextDay}>Next<ChevronRight className="h-4 w-4 ml-2" /></Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Calories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>{activity.duration} min</TableCell>
                  <TableCell>{activity.caloriesBurned.toFixed(2)} cal</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end space-x-2">
            <Link to="/log-steps">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Log Steps
              </Button>
            </Link>
            <Link to="/add-activity">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Log Activity
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
    </div>
  )
}

export function ProgressCard({ title, current, goal, unit, reverse = false }) {
  const percentage = reverse
    ? ((goal - current) / (goal - Math.min(current, goal))) * 100
    : (current / goal) * 100

  return (
    <div className="p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-3xl font-bold mb-2">
        {current.toFixed(1)} <span className="text-sm font-normal">/ {goal} {unit}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}