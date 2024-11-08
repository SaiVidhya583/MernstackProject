import express from 'express';
import { createDonation, getDonations } from '../controllers/donationController.js';

const router = express.Router();

router.post('/donations', createDonation);
router.get('/donations', getDonations);

export default router;
