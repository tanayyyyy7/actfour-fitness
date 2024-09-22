import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import FullActivityLog from './components/FullActivityLog';
import AddActivity from './components/AddActivity';
import LogSteps from './components/LogSteps';
import MyStats from './components/MyStats';
import { UserProvider } from './components/contexts/UserContext';
import { ActivityProvider } from './components/contexts/ActivityContext';
import MyStatsPage from './components/MyStatsPage';

export default function App() {
  return (
    <UserProvider>
      <ActivityProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/full-activity-log" element={<FullActivityLog />} />
          <Route path="/add-activity" element={<AddActivity />} />
          <Route path="/log-steps" element={<LogSteps />} />
          <Route path="/my-stats" element={<MyStatsPage />} />
        </Routes>
      </ActivityProvider>
    </UserProvider>
  );
}