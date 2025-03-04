import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Droplet, User } from 'lucide-react';
import { useDonation } from '../context/DonationContext';
import { useWallet } from '../context/WalletContext';
import ConnectWalletPrompt from '../components/ConnectWalletPrompt';
import TransactionStatus from '../components/TransactionStatus';

const DonatePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const donorIdParam = searchParams.get('donorId');
  
  const [selectedDonorId, setSelectedDonorId] = useState(donorIdParam || '');
  const [units, setUnits] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'success' | 'error' | null>(null);
  const [transactionMessage, setTransactionMessage] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  const { donors, addDonation } = useDonation();
  const { wallet } = useWallet();
  const navigate = useNavigate();

  // Update selected donor when URL param changes
  useEffect(() => {
    if (donorIdParam) {
      setSelectedDonorId(donorIdParam);
    }
  }, [donorIdParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDonorId || units <= 0) {
      alert('Please select a donor and enter a valid number of units');
      return;
    }

    setIsSubmitting(true);
    setTransactionStatus('pending');
    setTransactionMessage('Recording your blood donation...');

    try {
      await addDonation(selectedDonorId, units);
      setTransactionStatus('success');
      setTransactionMessage('Your donation has been successfully recorded!');
      setTransactionHash(`0x${Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`);
      
      // Redirect to history page after a short delay
      setTimeout(() => {
        navigate('/history');
      }, 2000);
    } catch (error) {
      console.error('Error recording donation:', error);
      setTransactionStatus('error');
      setTransactionMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      setIsSubmitting(false);
    }
  };

  if (!wallet.connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Record a Donation
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Connect your wallet to record a blood donation
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <ConnectWalletPrompt />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Record a Donation
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Record your blood donation on the blockchain
        </p>
      </div>
      
      <div className="max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="donor" className="block text-sm font-medium text-gray-700 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Select Donor
              </label>
              <div className="mt-1">
                <select
                  id="donor"
                  name="donor"
                  required
                  value={selectedDonorId}
                  onChange={(e) => setSelectedDonorId(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  disabled={!!donorIdParam}
                >
                  <option value="">Select a donor</option>
                  {donors.map((donor) => (
                    <option key={donor.id} value={donor.id}>
                      {donor.name} ({donor.bloodGroup})
                    </option>
                  ))}
                </select>
              </div>
              {donors.length === 0 && (
                <p className="mt-2 text-sm text-red-600">
                  No donors registered yet. Please register as a donor first.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="units" className="block text-sm font-medium text-gray-700 flex items-center">
                <Droplet className="h-4 w-4 mr-2" />
                Units Donated
              </label>
              <div className="mt-1">
                <input
                  id="units"
                  name="units"
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={units}
                  onChange={(e) => setUnits(parseInt(e.target.value))}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Standard donation is typically 1 unit (450-500 ml)
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || donors.length === 0 || !selectedDonorId}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70"
              >
                {isSubmitting ? 'Recording Donation...' : 'Record Donation'}
              </button>
            </div>

            <TransactionStatus 
              status={transactionStatus} 
              message={transactionMessage}
              txHash={transactionHash}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonatePage;