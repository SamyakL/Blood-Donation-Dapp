import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import { User, Calendar, Droplet, ExternalLink } from 'lucide-react';
import DonationCard from '../components/DonationCard';

const DonorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getDonorById, getDonationsByDonorId } = useDonation();

  const donor = id ? getDonorById(id) : undefined;
  const donations = id ? getDonationsByDonorId(id) : [];

  if (!donor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Donor Not Found</h2>
          <p className="mt-2 text-gray-600">The donor you're looking for doesn't exist or has been removed.</p>
          <Link to="/donors" className="mt-4 inline-block text-red-600 hover:text-red-800">
            ← Back to Donors
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(donor.registrationDate).toLocaleDateString();
  const totalUnits = donations.reduce((sum, donation) => sum + donation.units, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/donors" className="text-red-600 hover:text-red-800 flex items-center mb-6">
        ← Back to Donors
      </Link>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold leading-6 text-gray-900">Donor Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and donation history.</p>
          </div>
          <Link 
            to={`/donate?donorId=${donor.id}`}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Record Donation
          </Link>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Full name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{donor.name}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Droplet className="h-4 w-4 mr-2" />
                Blood group
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{donor.bloodGroup}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Registration date
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formattedDate}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Wallet address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <span className="font-mono truncate">{donor.walletAddress}</span>
                <a 
                  href={`https://etherscan.io/address/${donor.walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total donations</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {donations.length} donations ({totalUnits} units)
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Donation History</h2>
        
        {donations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {donations.map((donation) => (
              <DonationCard key={donation.id} donation={donation} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Droplet className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No donations yet</h3>
            <p className="mt-1 text-sm text-gray-500">This donor hasn't made any donations yet.</p>
            <div className="mt-6">
              <Link
                to={`/donate?donorId=${donor.id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Record First Donation
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDetailPage;