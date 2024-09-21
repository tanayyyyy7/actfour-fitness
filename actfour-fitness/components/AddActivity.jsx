<<<<<<< HEAD
// AddActivity.jsx
=======
>>>>>>> 97a64a4 (added responsive UI for components)
import React, { useContext, useState, useMemo } from 'react';
import { ActivityContext } from './contexts/ActivityContext';
import { UserContext } from './contexts/UserContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import metData from './data/mets.json';

const activityCategories = [
  "bicycling", "conditioning exercise", "dancing", "fishing and hunting", 
  "home activities", "home repair", "inactivity quiet/light", "lawn and garden", 
  "miscellaneous", "music playing", "occupation", "running", "self care", 
  "sexual activity", "sports", "transportation", "walking", "water activities", 
  "winter activities", "religious activities", "volunteer activities"
];

function AddActivity({ onClose }) {
  const { addActivity } = useContext(ActivityContext);
  const { user } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMotion, setSelectedMotion] = useState('');
  const [duration, setDuration] = useState('');

  const motionsByCategory = useMemo(() => {
    return metData.reduce((acc, item) => {
      const category = activityCategories.find(cat => item.activity.toLowerCase().includes(cat));
      if (category) {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({ id: item.id, motion: item.motion, met: item.met });
      }
      return acc;
    }, {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedActivity = metData.find(item => item.id.toString() === selectedMotion);
    if (!selectedActivity) {
      console.error('Activity not found');
      return;
    }
    const caloriesBurned = (selectedActivity.met * user.weight * (parseInt(duration) / 60)).toFixed(2);
    addActivity({ 
      type: selectedActivity.motion,
      duration: parseInt(duration),
      caloriesBurned: parseFloat(caloriesBurned),
      date: new Date()
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="category">Activity Category</Label>
        <Select onValueChange={setSelectedCategory} value={selectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {activityCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && (
        <div>
          <Label htmlFor="motion">Specific Activity</Label>
          <Select onValueChange={setSelectedMotion} value={selectedMotion}>
            <SelectTrigger>
              <SelectValue placeholder="Select a specific activity" />
            </SelectTrigger>
            <SelectContent>
              {motionsByCategory[selectedCategory]?.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.motion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input
          id="duration"
          name="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={!selectedMotion || !duration}>Add Activity</Button>
    </form>
  );
}

export default AddActivity;