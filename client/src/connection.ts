import ABI from "../../api/ABI.json" assert { type: 'json' }
import { ethers } from "ethers"


// Connect to donorRegistration contract;
const provider = new ethers.JsonRpcProvider("https://hidden-proportionate-snow.ethereum-sepolia.quiknode.pro/be758c09d5c6b241806e1e5c786d2659f523d16f")
const contractAddress = "0x67689144eC89a671FF78AacbF1bc82bA2066BfFa";

// Export a single instance of the contract
export const DonorRegisterations = new ethers.Contract(contractAddress, ABI, provider);


// ... existing code ...
// import { provider, DonorRegisterations } from './connectionProvider';
// ... existing code ...