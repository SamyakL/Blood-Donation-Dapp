import React from 'react';
import { Calendar, Droplet, Hash } from 'lucide-react';
import { Donation } from '../types';
import { Link } from 'react-router-dom';

interface DonationCardProps {
  donation: Donation;
}

const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  const formattedDate = new Date(donation.date).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Droplet className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">{donation.donorName}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <span>Blood Group: {donation.bloodGroup}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Date: {formattedDate}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="font-medium">Units Donated: {donation.units}</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Hash className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">Tx: {donation.transactionHash}</span>
        </div>
        
        <div className="flex justify-between">
          <Link 
            to={`/donor/${donation.donorId}`}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            View Donor
          </Link>
          <a 
            href={`https://etherscan.io/tx/${donation.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Transaction
          </a>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;