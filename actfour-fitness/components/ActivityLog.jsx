// src/components/ActivityLog.jsx
import React from 'react';
import { Plus, Info, PencilRuler, BadgeInfo } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";


export default function ActivityLog({
    activities,
    handleLogStepsClick,
    handleLogActivityClick,
    isToday
}) {
    return (
        <div className="border p-6 rounded-lg shadow-md">
            <div className='text-lg mb-4 flex flex-row justify-between'>
                <h3 className="font-semibold w-fit">Activity Log</h3>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger >
                                <BadgeInfo className="h-5 w-5 mr-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>To view or edit all previous records, Click the button below the table</p>
                            </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className='text-base'>
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
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Log Steps
                </Button>
                <Button
                    className="w-full sm:w-auto"
                    onClick={handleLogActivityClick}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Log Activity
                </Button>
            </div>
        </div>
    );
}