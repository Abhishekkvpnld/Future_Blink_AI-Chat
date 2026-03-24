import axios from "axios";
import Chat from "../models/chat.js";

// 🔹 Ask AI
export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    // ✅ Validate input
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // ✅ Call OpenRouter API
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/auto", // ✅ FIX
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": `${process.env.FRONTEND_URL}`,
          "X-Title": "AI Flow App",
        },
      },
    );

    // ✅ Extract response
    const answer =
      response?.data?.choices?.[0]?.message?.content || "No response";

    // ✅ Send back to frontend
    res.status(200).json({ answer });
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);

    res.status(500).json({
      message: "AI request failed",
    });
  }
};

// 🔹 Save Chat
export const saveChat = async (req, res) => {
  try {
    const { prompt, response } = req.body;

    const chat = await Chat.create({ prompt, response });

    res.status(201).json(chat);
  } catch (error) {
    console.error("Save Error:", error.message);
    res.status(500).json({ message: "Saving failed" });
  }
};

// 🔹 Get Chats
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};
