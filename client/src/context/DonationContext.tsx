import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Donor, Donation } from '../types';
import { useWallet } from './WalletContext';
import { ethers } from 'ethers';
import DonorRegisterationsABI from "../../../api/DonorRegisterationsABI.json"
import RegisterDonationABI from "../../../api/RecordDonationsABI.json"
interface DonationContextType {
  donors: Donor[];
  donations: Donation[];
  registerDonor: (name: string, bloodGroup: string) => Promise<void>;
  addDonation: (units: BigInt, date: string) => Promise<void>;
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
  const contractAddress = "0x55044ce6E117F5E71aA1b338459385f02dACC3D0";
  const registerDonationContract = "0xc6765Ea5A9F4356a58fB8aBE39d484904f54399f"
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

    // Check if user is already registered:
    const { ethereum } = window;
    if (!ethereum) {
      throw new Error('Ethereum object not found. Make sure you have MetaMask installed.');
    }

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, DonorRegisterationsABI, signer);

    const existingDonorId = await contract.donorIDS(wallet.address);
    if (existingDonorId) {
      alert('Your wallet is already registered as a donor.');
      return; // Exit the function if already registered
    }

    const _id = BigInt('0x' + uuidv4().replace(/-/g, '').slice(0, 6));

    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      await contract.connect(signer);
      const tx = await contract.registerDonor(_id, name, bloodGroup);
      await tx.wait();
      console.log("Success!!");
      console.log(tx);
    }
    catch (error) {
      console.log("ERROR!!! : ")
      console.log(error);
    }

    // In a real DApp, this would be a blockchain transaction
    // For now, we'll simulate it with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newDonor: Donor = {
      id: _id.toString(),
      name,
      bloodGroup,
      walletAddress: wallet.address,
      registrationDate: new Date().toISOString(),
    };

    setDonors(prevDonors => [...prevDonors, newDonor]);
    return;
  };

  const addDonation = async (units: BigInt, date: string) => {
    if (!wallet.connected) {
      throw new Error('Wallet not connected');
    }

    // In a real DApp, this would be a blockchain transaction
    // For now, we'll simulate it with a delay and a fake transaction hash
    //await new Promise(resolve => setTimeout(resolve, 1000));
    const { ethereum } = window;
    if (!ethereum) {
      throw new Error('Ethereum object not found. Make sure you have MetaMask installed.');
    }

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, DonorRegisterationsABI, signer);
    const donationContract = new ethers.Contract(registerDonationContract, RegisterDonationABI, signer);
    contract.connect(signer);

    try {
      console.log("Trying to fecth id: ")

      const _id = await contract.donorIDS(signer.address)

      console.log(_id.toString())
      if (_id == "0") {
        alert("PLs register First");
        return;
      }
      // _id = BigInt('0x' + uuidv4().replace(/-/g, '').slice(0, 6));
      const tx = await donationContract.recordDonations(_id, units, date);
      await tx.wait();
      console.log("Success!!");
      console.log(tx);
    } catch (error) {
      console.log("error while registering your doantions: ")
      console.log(error);
    }

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