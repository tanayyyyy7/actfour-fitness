import React, { useContext, useState } from 'react'
import { ActivityContext } from './contexts/ActivityContext'
import { Link } from 'react-router-dom'
import { format, isToday } from 'date-fns';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function FullActivityLog() {
    const { activities, updateActivity, deleteActivity } = useContext(ActivityContext);
    const [editingId, setEditingId] = useState(null);
    const [editedActivity, setEditedActivity] = useState({});
  
    const handleEdit = (activity) => {
      setEditingId(activity.id);
      setEditedActivity(activity);
    };
  
    const handleSave = () => {
      updateActivity(editedActivity);
      setEditingId(null);
    };
  
    const handleChange = (e) => {
      setEditedActivity({ ...editedActivity, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl font-semibold mb-4">Activity Log</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{format(new Date(activity.date), 'MMM d, yyyy')}</TableCell>
                  {editingId === activity.id && isToday(new Date(activity.date)) ? (
                    <>
                      <TableCell>
                        <Input
                          type="text"
                          name="type"
                          value={editedActivity.type}
                          onChange={handleChange}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          name="duration"
                          value={editedActivity.duration}
                          onChange={handleChange}
                        />
                      </TableCell>
                      <TableCell>{editedActivity.caloriesBurned.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button onClick={handleSave} className="mr-2">Save</Button>
                        <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</TableCell>
                      <TableCell>{activity.duration} minutes</TableCell>
                      <TableCell>{activity.caloriesBurned.toFixed(2)} cal</TableCell>
                      <TableCell>
                        {isToday(new Date(activity.date)) && (
                          <>
                            <Button onClick={() => handleEdit(activity)} className="mr-2">Edit</Button>
                            <Button variant="destructive" onClick={() => deleteActivity(activity.id)}>Delete</Button>
                          </>
                        )}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Link to="/">
          <Button className="mt-4">Back to Home</Button>
        </Link>
      </div>
    );
  }
  