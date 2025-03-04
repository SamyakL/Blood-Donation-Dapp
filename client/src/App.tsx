import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { DonationProvider } from './context/DonationContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DonorsPage from './pages/DonorsPage';
import DonorDetailPage from './pages/DonorDetailPage';
import RegisterPage from './pages/RegisterPage';
import DonatePage from './pages/DonatePage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <WalletProvider>
      <DonationProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/donors" element={<DonorsPage />} />
                <Route path="/donor/:id" element={<DonorDetailPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/donate" element={<DonatePage />} />
                <Route path="/history" element={<HistoryPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </DonationProvider>
    </WalletProvider>
  );
}

export default App;