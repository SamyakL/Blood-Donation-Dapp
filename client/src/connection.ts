import ABI from "../../api/DonorRegisterationsABI.json" assert { type: 'json' }
import { ethers } from "ethers"


// Connect to donorRegistration contract;
const provider = new ethers.JsonRpcProvider("https://hidden-proportionate-snow.ethereum-sepolia.quiknode.pro/be758c09d5c6b241806e1e5c786d2659f523d16f")
const contractAddress = "0x55044ce6E117F5E71aA1b338459385f02dACC3D0";

// Export a single instance of the contract
export const DonorRegisterations = new ethers.Contract(contractAddress, ABI, provider);


//registerDonation
export const registerDonationAddress = "0xc6765Ea5A9F4356a58fB8aBE39d484904f54399f"

// ... existing code ...
// import { provider, DonorRegisterations } from './connectionProvider';
// ... existing code ...