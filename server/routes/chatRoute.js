import express from "express";
import {
  askAI,
  saveChat,
  getChats,
} from "../controllers/chatController.js";


const router = express.Router();


router.post("/ask-ai", askAI);
router.post("/save", saveChat);
router.get("/all", getChats);

export default router; 