import React, { useContext, useState } from 'react'
import { ActivityContext } from './contexts/ActivityContext'
import { UserContext } from './contexts/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LogSteps() {
  const { addSteps } = useContext(ActivityContext)
  const { user } = useContext(UserContext)
  const [steps, setSteps] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const stepsCount = parseInt(steps)
    const strideLength = user.height * 0.413 // in cm
    const distanceWalked = (stepsCount * strideLength) / 100000 // in km
    const caloriesBurned = stepsCount * 0.04
    addSteps(stepsCount, distanceWalked, caloriesBurned)
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Log Steps</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="steps">Number of Steps</Label>
          <Input
            id="steps"
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Log Steps</Button>
      </form>
      <Link to="/">
        <Button variant="outline" className="mt-4">Back to Home</Button>
      </Link>
    </div>
  )
}