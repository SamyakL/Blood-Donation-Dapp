import express from "express";
import { getAllDonors, getDonor } from "../controllers/donorController.js"

const router = express.Router();
router.get("/getDonors", getAllDonors);
router.get("/getDonor/:id", getDonor);

export default router