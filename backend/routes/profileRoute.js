import express from "express";
import { validateToken } from "../middleWare/tokenHandler.js";
import {
  getProfile,
  updateProfile,
  addSkill,
  addExperience
} from "../controllers/profileController.js";

const router3 = express.Router();

router3.get("/", validateToken, getProfile);
router3.put("/", validateToken, updateProfile);
router3.post("/skill", validateToken, addSkill);
router3.post("/experience", validateToken, addExperience);

export default router3;