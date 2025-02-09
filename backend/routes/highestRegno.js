import express from "express";
import authMiddleware from '../middleware/authMiddleware.js'
import { fetchHighestRegNo } from "../controllers/memberController.js";

const router = express.Router();

// Get highest registration number from members table
router.get('/regNo', authMiddleware, fetchHighestRegNo)

export default router;