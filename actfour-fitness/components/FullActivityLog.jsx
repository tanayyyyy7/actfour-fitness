import React, { useContext, useState } from 'react';
import { ActivityContext } from './contexts/ActivityContext';
import { Link } from 'react-router-dom';
import { format, isToday } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

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
    <div className="min-w-screen mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6 pb-4 ">
        <h2 className="text-2xl font-semibold">Full Activity Log</h2>
        <div className='flex items-center space-x-4'>
        <ModeToggle />
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        {activities.length === 0 ? (
          <Card>
            <CardContent className="text-center py-10">
              <p className="text-muted-foreground">No activities found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className='rounded-md border'> 
          <Table >
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{format(new Date(activity.date), 'MMM d, yyyy')}</TableCell>
                  {editingId === activity.id && isToday(new Date(activity.date)) ? (
                    <>
                      <TableCell>
                        <Input
                          type="text"
                          name="type"
                          value={editedActivity.type}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          name="duration"
                          value={editedActivity.duration}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>{editedActivity.caloriesBurned.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={handleSave}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</TableCell>
                      <TableCell>{!activity.duration ? "-" : activity.duration + ' minutes'}</TableCell>
                      <TableCell>{activity.caloriesBurned.toFixed(2)} cal</TableCell>
                      <TableCell>
                        {isToday(new Date(activity.date)) && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(activity)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteActivity(activity.id)}>
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        )}
      </div>
    </div>
  );
}