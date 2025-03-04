import React from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

type TransactionStatus = 'pending' | 'success' | 'error' | null;

interface TransactionStatusProps {
  status: TransactionStatus;
  message?: string;
  txHash?: string;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ 
  status, 
  message,
  txHash
}) => {
  if (!status) return null;

  return (
    <div className={`mt-4 p-4 rounded-md ${
      status === 'success' ? 'bg-green-50 border border-green-200' : 
      status === 'error' ? 'bg-red-50 border border-red-200' : 
      'bg-blue-50 border border-blue-200'
    }`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
          {status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
          {status === 'pending' && <Loader className="h-5 w-5 text-blue-500 animate-spin" />}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${
            status === 'success' ? 'text-green-800' : 
            status === 'error' ? 'text-red-800' : 
            'text-blue-800'
          }`}>
            {status === 'success' ? 'Transaction Successful' : 
             status === 'error' ? 'Transaction Failed' : 
             'Transaction Pending'}
          </h3>
          {message && <div className="mt-2 text-sm text-gray-700">{message}</div>}
          {txHash && (
            <div className="mt-2">
              <a 
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View on Etherscan
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionStatus;