import React, { useContext, useState } from 'react'
import { ActivityContext } from './contexts/ActivityContext'
import { UserContext } from './contexts/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import metData from './data/mets.json'

export default function AddActivity() {
  const { addActivity } = useContext(ActivityContext)
  const { user } = useContext(UserContext)
  const [activity, setActivity] = useState({ type: '', duration: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const met = metData.find(item => item.activity.toLowerCase() === activity.type.toLowerCase())?.met || 3
    const caloriesBurned = (met * user.weight * (activity.duration / 60)).toFixed(2)
    addActivity({ ...activity, caloriesBurned: parseFloat(caloriesBurned) })
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Log Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="type">Activity Type</Label>
          <Input
            id="type"
            name="type"
            value={activity.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            value={activity.duration}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Add Activity</Button>
      </form>
      <Link to="/">
        <Button variant="outline" className="mt-4">Back to Home</Button>
      </Link>
    </div>
  )
}