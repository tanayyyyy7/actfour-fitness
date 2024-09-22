import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/contexts/UserContext';
import { ActivityProvider } from './components/contexts/ActivityContext';
import SuspenseFallback from './components/SuspenseFallback';

const HomeScreen = lazy(() => import('./components/HomeScreen'));
const FullActivityLog = lazy(() => import('./components/FullActivityLog'));
const AddActivity = lazy(() => import('./components/AddActivity'));
const LogSteps = lazy(() => import('./components/LogSteps'));
const MyStatsPage = lazy(() => import('./components/MyStatsPage'));

export default function App() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
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
    </Suspense>
  );
}