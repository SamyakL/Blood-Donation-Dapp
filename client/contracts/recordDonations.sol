// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;
import "./blooddapp.sol";

contract RecordDonations is DonorRegisterations{

    //Address of deployer of RecordDonations contract
    address public secondOwner;


    //struct for recording donations
    struct Donation{
        uint donorID;
        uint units;
        string date;
    }

    //To store all donations
    Donation[] public donations;

    //event donation recorded
    event donationRecorded(uint donorId , uint units);

    constructor(){
        secondOwner = msg.sender;        
    }



    //function to record donation
    function recordDonations(uint _donorID, uint _units,string calldata _date) external {
       Donation memory donation = Donation({donorID:_donorID,units:_units,date:_date}); 
       donations.push(donation);
       emit donationRecorded(_donorID , _units);
    }

    //function to fetch all donations
    function getAllDonations() external view returns (Donation[] memory){
        return donations;
    }

    
    // Function to get donations of donorID
    function getDonationsByDonorId(uint id) public view  returns (bool, Donation[] memory) {
        uint len = donations.length;
        // First, count how many donations belong to the given donorID
        uint count = 0;
        for (uint i = 0; i < len; ++i) {
          if (donations[i].donorID == id) {
                count++;
            }
        }
        // Create the array in memory with the exact length
        Donation[] memory userDonation = new Donation[](count);
    
        // Now, populate the userDonation array
        uint j = 0;
        for (uint i = 0; i < len; ++i) {
            if (donations[i].donorID == id) {
                userDonation[j] = donations[i];
                j++;
            }
        }
        return (true, userDonation);
}

}