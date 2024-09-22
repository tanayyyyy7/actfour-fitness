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
import { MoreVertical, Pencil, Trash, ArrowLeft, CircleEllipsis } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
          <h1 className="text-3xl font-bold ">Full Activity Log</h1>
          <div className='flex items-center space-x-4'>
            <ModeToggle />
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-md overflow-hidden p-4">
          {activities.length === 0 ? (
            <Card>
              <CardContent className="text-center py-10">
                <p className="text-muted-foreground">No activities found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
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
                              className="w-full bg-background text-foreground"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              name="duration"
                              value={editedActivity.duration}
                              onChange={handleChange}
                              className="w-full bg-background text-foreground"
                            />
                          </TableCell>
                          <TableCell>{editedActivity.caloriesBurned.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex justify-end space-x-2">
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
                          <TableCell className="text-right">
                            {isToday(new Date(activity.date)) && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-primary">
                                    <span className="sr-only">Open menu</span>
                                    <CircleEllipsis className="h-4 w-4" />
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
    </div>
  );
}