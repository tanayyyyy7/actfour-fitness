// src/components/ActivityLog.jsx
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ActivityLog({ 
  activities, 
  handleLogStepsClick, 
  handleLogActivityClick,
  isToday
}) {
  return (
    <div className="border p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow  className='text-base'>
              <TableHead>Activity</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Calories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
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

      {/* Dialog Triggers */}
      <div className="mt-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto" 
          onClick={handleLogStepsClick}
          disabled={!isToday}
        >
          <Plus className="h-4 w-4 mr-2" />
          Log Steps
        </Button>
        <Button 
          className="w-full sm:w-auto" 
          onClick={handleLogActivityClick}
          disabled={!isToday}
        >
          <Plus className="h-4 w-4 mr-2" />
          Log Activity
        </Button>
      </div>
    </div>
  );
}