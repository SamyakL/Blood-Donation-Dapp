// Connect to donorRegisterion contract;
import ABI from "./ABI.json" assert { type: 'json' }
import { ethers } from "ethers"
const provider = new ethers.JsonRpcProvider("https://hidden-proportionate-snow.ethereum-sepolia.quiknode.pro/be758c09d5c6b241806e1e5c786d2659f523d16f")
const contractAddress = "0x67689144eC89a671FF78AacbF1bc82bA2066BfFa";
const DonorRegisterations = new ethers.Contract(contractAddress, ABI, provider);

