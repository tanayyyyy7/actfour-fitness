import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function MyStats() {
  const { user, updateUser } = useContext(UserContext);
  const { toast } = useToast();
  const [stats, setStats] = useState({
    weight: user.weight,
    height: user.height,
    goalWeight: user.goalWeight
  });
  const [weightHistory, setWeightHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('weightHistory') || '[]');
    setWeightHistory(storedHistory);
  }, []);

  const handleChange = (e) => {
    setStats({ ...stats, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(stats);

    const newHistory = [...weightHistory, { date: new Date().toISOString().split('T')[0], weight: stats.weight }];
    setWeightHistory(newHistory);
    localStorage.setItem('weightHistory', JSON.stringify(newHistory));

    toast({
      title: 'Stats updated successfully',
      description: 'Your stats have been updated successfully.',
      variant: 'default',
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weight History</CardTitle>
        </CardHeader>
        <CardContent className='pl-0'>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightHistory}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}kg`}
                  domain={[40, 120]}
                  ticks={[40, 60, 80, 100, 120]}
                />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#8884d8" 
                strokeWidth={2} 
                dot={{ fill: "#8884d8", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <div className='flex flex-wrap sm:justify-around'> 
          <div className="w-fit">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              className=""
              id="weight"
              name="weight"
              type="number"
              value={stats.weight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-fit">
            <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
            <Input
              className=""
              id="goalWeight"
              name="goalWeight"
              type="number"
              value={stats.goalWeight}
              onChange={handleChange}
              required
            />
          </div>
          
        <div className="w-fit">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            className=""
            id="height"
            name="height"
            type="number"
            value={stats.height}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        <Button type="submit">Update Stats</Button>
      </form>

      
    </div>
  );
}