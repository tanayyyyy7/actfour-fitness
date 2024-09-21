import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import ActivityLog from './components/ActivityLog';
import AddActivity from './components/AddActivity';
import LogSteps from './components/LogSteps';
import MyStats from './components/MyStats';
import { UserProvider } from './components/contexts/UserContext';
import { ActivityProvider } from './components/contexts/ActivityContext';

export default function App() {
  return (
    <UserProvider>
      <ActivityProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/activity-log" element={<ActivityLog />} />
          <Route path="/add-activity" element={<AddActivity />} />
          <Route path="/log-steps" element={<LogSteps />} />
          <Route path="/my-stats" element={<MyStats />} />
        </Routes>
      </ActivityProvider>
    </UserProvider>
  );
}