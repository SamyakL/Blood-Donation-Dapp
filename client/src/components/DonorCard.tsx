import React from 'react';
import { Link } from 'react-router-dom';
import { User, Droplet } from 'lucide-react';
import { Donor } from '../types';

interface DonorCardProps {
  donor: Donor;
}

const DonorCard: React.FC<DonorCardProps> = ({ donor }) => {
  console.log("Donor prop")
  console.log(donor);
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
              <span>Blood Group: {donor.bloodType}</span>
              <br />

            </div>
            <span>User ID: {donor.id}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <Link
            to={`/donor/${donor.id}`}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            View Details
          </Link>

        </div>
      </div>
    </div>
  );
};

export default DonorCard;