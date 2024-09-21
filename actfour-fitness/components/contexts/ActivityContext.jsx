import React, { createContext, useState, useEffect } from 'react'

export const ActivityContext = createContext()

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem('activities')
    return savedActivities ? JSON.parse(savedActivities) : []
  })

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities))
  }, [activities])

  const addActivity = (activity) => {
    setActivities([...activities, { ...activity, id: Date.now() }])
  }

  const updateActivity = (updatedActivity) => {
    setActivities(activities.map(activity => 
      activity.id === updatedActivity.id ? updatedActivity : activity
    ))
  }

  const deleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id))
  }

  const addSteps = (steps, distance, calories) => {
    setActivities([...activities, {
      id: Date.now(),
      type: 'Walking',
      steps,
      distance,
      caloriesBurned: calories
    }])
  }

  const getTotalCaloriesBurned = () => {
    return activities.reduce((total, activity) => total + (activity.caloriesBurned || 0), 0)
  }

  const getTotalSteps = () => {
    return activities
      .filter(activity => activity.type === 'Walking')
      .reduce((total, activity) => total + (activity.steps || 0), 0)
  }

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
  )
}