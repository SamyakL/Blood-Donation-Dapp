import React, { useState } from 'react';
import { useDonation } from '../context/DonationContext';
import DonationCard from '../components/DonationCard';
import { Calendar, SortDesc, SortAsc } from 'lucide-react';
import { Donation } from '../types';

const HistoryPage: React.FC = () => {
  const { donations } = useDonation();
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const sortedDonations = [...donations].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Donation History
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          View all blood donations recorded on the blockchain
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={toggleSortOrder}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Sort by Date
          {sortOrder === 'desc' ? (
            <SortDesc className="h-4 w-4 ml-2" />
          ) : (
            <SortAsc className="h-4 w-4 ml-2" />
          )}
        </button>
      </div>

      {sortedDonations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedDonations.map((donation: Donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No donations yet</h3>
          <p className="mt-1 text-sm text-gray-500">There are no blood donations recorded yet.</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;