import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LogSteps from './LogSteps';

export default function LogStepsDialog({ isOpen, onOpenChange }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Steps</DialogTitle>
          <DialogDescription>
            Enter the number of steps you've taken today.
          </DialogDescription>
        </DialogHeader>
        <LogSteps onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}