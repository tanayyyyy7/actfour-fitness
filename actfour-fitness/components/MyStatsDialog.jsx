import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MyStats from './MyStats';

export default function MyStatsDialog({ isOpen, onOpenChange }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>My Stats</DialogTitle>
          <DialogDescription>Update your current stats and view weight history.</DialogDescription>
        </DialogHeader>
        <MyStats onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}