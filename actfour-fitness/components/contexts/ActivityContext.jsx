<<<<<<< HEAD
// src/contexts/ActivityContext.jsx
=======
>>>>>>> 97a64a4 (added responsive UI for components)
import React, { createContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

export const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem('activities');
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const addActivity = (activity) => {
    setActivities([...activities, { ...activity, id: Date.now(), date: new Date() }]);
  };

  const updateActivity = (updatedActivity) => {
    setActivities(activities.map(activity => 
      activity.id === updatedActivity.id ? updatedActivity : activity
    ));
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const addSteps = (steps, distance, calories) => {
    setActivities([...activities, {
      id: Date.now(),
      type: 'Walking',
      steps,
      distance,
      caloriesBurned: calories,
      date: new Date()
    }]);
  };

  const getTotalCaloriesBurned = (date) => {
    return activities
      .filter(activity => format(new Date(activity.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
      .reduce((total, activity) => total + (activity.caloriesBurned || 0), 0);
  };

  const getTotalSteps = (date) => {
    return activities
      .filter(activity => 
        activity.type === 'Walking' && 
        format(new Date(activity.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
      .reduce((total, activity) => total + (activity.steps || 0), 0);
  };

  return (
    <ActivityContext.Provider value={{
      activities,
      addActivity,
      updateActivity,
      deleteActivity,
      addSteps,
      getTotalCaloriesBurned,
      getTotalSteps
    }}>
      {children}
    </ActivityContext.Provider>
  );
}