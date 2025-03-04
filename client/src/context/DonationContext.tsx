import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Donor, Donation } from '../types';
import { useWallet } from './WalletContext';

interface DonationContextType {
  donors: Donor[];
  donations: Donation[];
  registerDonor: (name: string, bloodGroup: string) => Promise<void>;
  addDonation: (donorId: string, units: number) => Promise<void>;
  getDonorById: (id: string) => Donor | undefined;
  getDonationsByDonorId: (donorId: string) => Donation[];
  searchDonors: (query: string) => Donor[];
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
};

interface DonationProviderProps {
  children: ReactNode;
}

export const DonationProvider: React.FC<DonationProviderProps> = ({ children }) => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const { wallet } = useWallet();

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedDonors = localStorage.getItem('donors');
    const storedDonations = localStorage.getItem('donations');

    if (storedDonors) {
      setDonors(JSON.parse(storedDonors));
    }

    if (storedDonations) {
      setDonations(JSON.parse(storedDonations));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('donors', JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem('donations', JSON.stringify(donations));
  }, [donations]);

  const registerDonor = async (name: string, bloodGroup: string) => {
    if (!wallet.connected || !wallet.address) {
      throw new Error('Wallet not connected');
    }

    // In a real DApp, this would be a blockchain transaction
    // For now, we'll simulate it with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newDonor: Donor = {
      id: uuidv4(),
      name,
      bloodGroup,
      walletAddress: wallet.address,
      registrationDate: new Date().toISOString(),
    };

    setDonors(prevDonors => [...prevDonors, newDonor]);
    return;
  };

  const addDonation = async (donorId: string, units: number) => {
    if (!wallet.connected) {
      throw new Error('Wallet not connected');
    }

    const donor = donors.find(d => d.id === donorId);
    if (!donor) {
      throw new Error('Donor not found');
    }

    // In a real DApp, this would be a blockchain transaction
    // For now, we'll simulate it with a delay and a fake transaction hash
    await new Promise(resolve => setTimeout(resolve, 1000));
    const txHash = `0x${Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)).join('')}`;

    const newDonation: Donation = {
      id: uuidv4(),
      donorId,
      donorName: donor.name,
      bloodGroup: donor.bloodGroup,
      units,
      date: new Date().toISOString(),
      transactionHash: txHash,
    };

    setDonations(prevDonations => [...prevDonations, newDonation]);
    return;
  };

  const getDonorById = (id: string) => {
    return donors.find(donor => donor.id === id);
  };

  const getDonationsByDonorId = (donorId: string) => {
    return donations.filter(donation => donation.donorId === donorId);
  };

  const searchDonors = (query: string) => {
    if (!query) return donors;

    const lowerCaseQuery = query.toLowerCase();
    return donors.filter(
      donor =>
        donor.name.toLowerCase().includes(lowerCaseQuery) ||
        donor.bloodGroup.toLowerCase().includes(lowerCaseQuery)
    );
  };

  return (
    <DonationContext.Provider
      value={{
        donors,
        donations,
        registerDonor,
        addDonation,
        getDonorById,
        getDonationsByDonorId,
        searchDonors
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};