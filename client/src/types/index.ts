export interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  walletAddress: string;
  registrationDate: string;
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  bloodGroup: string;
  units: number;
  date: string;
  transactionHash: string;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  chainId: string | null;
  connecting: boolean;
}