import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MyStats from './MyStats';

export default function MyStatsDialog({ isOpen, onOpenChange }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
        <DialogTitle>My Stats</DialogTitle>
        <DialogDescription>Update your current stats here.</DialogDescription>
        </DialogHeader>
        <MyStats onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}