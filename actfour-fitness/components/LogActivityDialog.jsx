import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddActivity from './AddActivity';

export default function LogActivityDialog({ isOpen, onOpenChange }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Activity</DialogTitle>
          <DialogDescription>
            Select an activity and enter its duration.
          </DialogDescription>
        </DialogHeader>
        <AddActivity onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}