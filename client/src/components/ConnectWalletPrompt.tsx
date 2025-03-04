import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const ConnectWalletPrompt: React.FC = () => {
  const { connectWallet, wallet } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
      <Wallet className="h-16 w-16 text-red-600 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Wallet Connection Required</h2>
      <p className="text-gray-600 mb-6 text-center">
        Please connect your wallet to access this feature. Connecting your wallet allows you to interact with the blockchain.
      </p>
      <button
        onClick={connectWallet}
        disabled={wallet.connecting}
        className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-70"
      >
        {wallet.connecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default ConnectWalletPrompt;