import React, { useState } from 'react';
import { useDonation } from '../context/DonationContext';
import DonorCard from '../components/DonorCard';
import SearchBar from '../components/SearchBar';
import { Donor } from '../types';

const DonorsPage: React.FC = () => {
  const { donors, searchDonors } = useDonation();
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>(donors);

  const handleSearch = (query: string) => {
    setFilteredDonors(searchDonors(query));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Blood Donors Registry
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Find registered blood donors and their information
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {filteredDonors.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDonors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No donors found</h3>
          <p className="mt-2 text-sm text-gray-500">
            {donors.length === 0 
              ? "There are no registered donors yet." 
              : "No donors match your search criteria."}
          </p>
        </div>
      )}
    </div>
  );
};

export default DonorsPage;