import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Droplet } from 'lucide-react';
import { useDonation } from '../context/DonationContext';
import { useWallet } from '../context/WalletContext';
import ConnectWalletPrompt from '../components/ConnectWalletPrompt';
import TransactionStatus from '../components/TransactionStatus';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'success' | 'error' | null>(null);
  const [transactionMessage, setTransactionMessage] = useState('');

  const { registerDonor } = useDonation();
  const { wallet } = useWallet();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !bloodGroup) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setTransactionStatus('pending');
    setTransactionMessage('Registering as a donor...');

    try {
      await registerDonor(name, bloodGroup);
      setTransactionStatus('success');
      setTransactionMessage('You have been successfully registered as a donor!');

      // Redirect to donors page after a short delay
      setTimeout(() => {
        navigate('/donors');
      }, 2000);
    } catch (error) {
      console.error('Error registering donor:', error);
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
            Register as a Donor
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Connect your wallet to register as a blood donor
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
          Register as a Donor
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Join our network of blood donors and help save lives
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 flex items-center">
                <Droplet className="h-4 w-4 mr-2" />
                Blood Group
              </label>
              <div className="mt-1">
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  required
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                  <option value="">Select your blood group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Wallet Address
              </label>
              <div className="mt-1 flex items-center">
                <span className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 sm:text-sm truncate">
                  {wallet.address}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                This wallet address will be associated with your donor profile
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70"
              >
                {isSubmitting ? 'Registering...' : 'Register as Donor'}
              </button>
            </div>

            <TransactionStatus
              status={transactionStatus}
              message={transactionMessage}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;