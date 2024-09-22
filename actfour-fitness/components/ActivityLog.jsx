import React from 'react';
import { Plus, BadgeInfo } from 'lucide-react';
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
        <div className="border border-border rounded-lg shadow-md bg-card text-card-foreground">
            <div className='p-4 flex flex-row justify-between items-center border-b border-border'>
                <h3 className="text-lg font-semibold">Activity Log</h3>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <BadgeInfo className="h-5 w-5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>To view all the previous records or edit today's records, click the button below the table</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="p-4 overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-base">Activity</TableHead>
                            <TableHead className="text-base">Duration</TableHead>
                            <TableHead className="text-base">Calories</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activities.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell className="font-medium">
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
            <div className="p-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 border-t border-border">
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