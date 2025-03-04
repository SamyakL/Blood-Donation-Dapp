import ABI from "../ABI.json" assert { type: 'json' }
import { ethers } from "ethers"


// Connect to donorRegisterion contract;
const provider = new ethers.JsonRpcProvider("https://hidden-proportionate-snow.ethereum-sepolia.quiknode.pro/be758c09d5c6b241806e1e5c786d2659f523d16f")
const contractAddress = "0x67689144eC89a671FF78AacbF1bc82bA2066BfFa";
const DonorRegisterations = new ethers.Contract(contractAddress, ABI, provider);

//To fetch all donors from the blockchain.
export const getAllDonors = async (req, res, next) => {
    console.log("yaha tak aagaya donotcontroller")
    const getalldonors = async () => {
        const donorsList = await DonorRegisterations.getAllDonors();
        console.log("Here is the list of donors: ");
        console.log(donorsList);

        // Convert BigInt to string for serialization
        const serializedDonorsList = donorsList.map(donor => ({
            id: donor.id.toString(), // Convert BigInt to string
            name: donor.name,
            bloodType: donor.bloodType
        }));

        return res.status(200).json({ list: serializedDonorsList })
    }
    try {
        await getalldonors()
    } catch (error) {
        console.log("error getting all donors:");
        console.log(error);
    }
}
//to fetch a single user from blockchain.
export const getDonor = async (req, res, next) => {
    const { id } = req.params; // Extract id from request parameters

    const fetchDonor = async () => {
        const donor = await DonorRegisterations.getDonor(id); // Call the smart contract function
        console.log("Here is the donor details: ");
        console.log(donor);

        // Convert BigInt to string for serialization
        const serializedDonor = {
            id: donor.id.toString(), // Convert BigInt to string
            name: donor.name,
            bloodType: donor.bloodType
        };

        return res.status(200).json({ donor: serializedDonor });
    }

    try {
        await fetchDonor();
    } catch (error) {
        console.log("error getting donor details:");
        console.log(error);
        return res.status(500).json({ error: "Error fetching donor details" });
    }
}


