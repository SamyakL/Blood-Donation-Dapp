import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Users, PlusCircle, History } from 'lucide-react';
import { useDonation } from '../context/DonationContext';
import { DonorRegisterations, registerDonationAddress } from "../connection"
import { useWallet } from '../context/WalletContext';
import { ethers } from 'ethers';
import RegisterDonationABI from "../../../api/RecordDonationsABI.json"

const HomePage: React.FC = () => {
  const { donations } = useDonation();
  const [totalDonors, setTotalDonors] = useState<BigInt>(BigInt(0));
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const [totalDonations, setTotalDonations] = useState<number>(0)
  const registerDonationContract = "0xc6765Ea5A9F4356a58fB8aBE39d484904f54399f"
  useEffect(() => {
    const fetchTotalDonors = async () => {
      const count = await DonorRegisterations.donorCount();
      setTotalDonors(count);
    };

    fetchTotalDonors();
  }, []);

  useEffect(() => {
    const fetchTotalDonations = async () => {
      if (!wallet.connected || !wallet.address) {
        throw new Error('Wallet not connected');
      }

      // Check if user is already registered:
      const { ethereum } = window;
      if (!ethereum) {
        throw new Error('Ethereum object not found. Make sure you have MetaMask installed.');
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(registerDonationContract, RegisterDonationABI, signer);
      contract.connect(signer);

      const donationCount = await contract.getAllDonations()
      console.log("total donations: ")
      console.log(donationCount);
      setTotalDonations(donationCount.length);
    };

    fetchTotalDonations();
  }, []);

  // Calculate total units donated
  const totalUnits = donations.reduce((sum, donation) => sum + donation.units, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          BloodDapp
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          A decentralized blood donation platform!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Donors</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{totalDonors.toString()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <Droplet className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Donations</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{totalDonations}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <PlusCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Units Donated</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{totalUnits}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <History className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Last Donation</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {donations.length > 0
                      ? new Date(donations[donations.length - 1].date).toLocaleDateString()
                      : 'No donations yet'}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Features */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to donate blood
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform leverages blockchain technology to create a transparent and efficient blood donation system.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Donor Registry</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Register as a donor and make your information available to those in need. Your data is secure on the blockchain.
                  </p>
                  <div className="mt-3">
                    <Link to="/register" className="text-red-600 hover:text-red-800 font-medium">
                      Register as a donor →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                  <Droplet className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Blood Donation</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Record your blood donations on the blockchain, creating an immutable record of your contributions.
                  </p>
                  <div className="mt-3">
                    <Link to="/donate" className="text-red-600 hover:text-red-800 font-medium">
                      Record a donation →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                  <History className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Donation History</h3>
                  <p className="mt-2 text-base text-gray-500">
                    View your complete donation history, with all records securely stored and easily accessible.
                  </p>
                  <div className="mt-3">
                    <Link to="/history" className="text-red-600 hover:text-red-800 font-medium">
                      View donation history →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Find Donors</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Search for donors by name or blood group to find potential matches quickly and efficiently.
                  </p>
                  <div className="mt-3">
                    <Link to="/donors" className="text-red-600 hover:text-red-800 font-medium">
                      Find donors →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-red-700 rounded-lg shadow-xl overflow-hidden mt-12">
        <div className="px-6 py-12 sm:px-12 lg:flex lg:items-center lg:py-16">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl" id="newsletter-headline">
              Ready to make a difference?
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-red-100">
              Join our platform today and become part of a global network of blood donors helping save lives through blockchain technology.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8">
            <div className="sm:flex">
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50 md:py-4 md:text-lg md:px-10"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;