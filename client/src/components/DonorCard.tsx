import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Droplet } from 'lucide-react';
import { Donor } from '../types';

interface DonorCardProps {
  donor: Donor;
}

const DonorCard: React.FC<DonorCardProps> = ({ donor }) => {
  const formattedDate = new Date(donor.registrationDate).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <User className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">{donor.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Droplet className="h-4 w-4 mr-1" />
              <span>Blood Group: {donor.bloodGroup}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Registered: {formattedDate}</span>
        </div>
        
        <div className="text-xs text-gray-500 mb-4 truncate">
          <span>Wallet: {donor.walletAddress}</span>
        </div>
        
        <div className="flex justify-between">
          <Link 
            to={`/donor/${donor.id}`}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            View Details
          </Link>
          <Link 
            to={`/donate?donorId=${donor.id}`}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorCard;