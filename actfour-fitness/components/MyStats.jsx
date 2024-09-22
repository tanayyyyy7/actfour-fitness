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
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 bg-background text-foreground">
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Weight History</CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightHistory}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}kg`}
                domain={[40, 120]}
                ticks={[40, 60, 80, 100, 120]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={stats.weight}
                  onChange={handleChange}
                  required
                  className="bg-background text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goalWeight" className="text-sm font-medium">Goal Weight (kg)</Label>
                <Input
                  id="goalWeight"
                  name="goalWeight"
                  type="number"
                  value={stats.goalWeight}
                  onChange={handleChange}
                  required
                  className="bg-background text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm font-medium">Height (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={stats.height}
                  onChange={handleChange}
                  required
                  className="bg-background text-foreground"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">Update Stats</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}