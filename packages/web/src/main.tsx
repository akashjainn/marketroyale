import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './pages/App';
import League from './pages/League';
import Contest from './pages/Contest';
import Live from './pages/Live';
import Profile from './pages/Profile';

const qc = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <nav className="p-2 flex gap-4 text-sm bg-slate-900 text-white">
          <Link to="/">Home</Link>
          <Link to="/league/1">League</Link>
          <Link to="/contest/1">Contest</Link>
          <Link to="/live/1">Live</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/league/:id" element={<League/>} />
            <Route path="/contest/:id" element={<Contest/>} />
            <Route path="/live/:id" element={<Live/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
