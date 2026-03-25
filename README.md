# 🚀 AI Flow Builder

A full-stack AI-powered flow application built with the MERN stack.
Users can type a prompt inside a visual **Input Node**, run the flow,
and view the AI-generated answer inside a **Result Node** using a
node-based UI.

------------------------------------------------------------------------

## ✨ Highlights

-   🔗 Visual flow UI (React Flow)
-   🧠 AI responses via OpenRouter (auto model routing)
-   🧩 Custom nodes (Input + Result)
-   💾 Save conversations to MongoDB
-   ⚡ Clean MERN architecture
-   🎨 Tailwind CSS UI

------------------------------------------------------------------------

## 🧱 Tech Stack

**Frontend** - React (Vite) - React Flow - Tailwind CSS - Axios

**Backend** - Node.js - Express.js

**Database** - MongoDB + Mongoose

**AI** - OpenRouter API (`openrouter/auto` for reliability)

------------------------------------------------------------------------

## 📁 Project Structure

    project/
     ├── client/
     │   └── src/
     │       ├── pages/
     │       ├── components/
     │       └── App.jsx
     ├── server/
     │   ├── config/
     │   ├── controllers/
     │   ├── models/
     │   ├── routes/
     │   └── server.js
     ├── .env
     └── README.md

------------------------------------------------------------------------

## ⚙️ Setup

### 1) Clone

    git clone https://github.com/your-username/ai-flow-builder.git
    cd ai-flow-builder

### 2) Backend

    cd server
    npm install

Create `.env`:

    PORT=5000
    MONGO_URI=your_mongodb_connection
    OPENROUTER_API_KEY=your_api_key
    AI_MODEL_URL=openrouter/auto
    FRONTEND_URL=http://localhost:5173

Run:

    npm run dev

### 3) Frontend

    cd client
    npm install
    npm run dev

------------------------------------------------------------------------

## 🔗 API

  Method   Endpoint      Description
  -------- ------------- ------------------------
  POST     /api/ask-ai   Get AI response
  POST     /api/save     Save prompt & response
  GET      /api/all      Get all saved data
------------------------------------------------------------------------

## 🔄 How It Works

1.  User types a prompt in the **Input Node**\
2.  Clicks **Run**\
3.  Frontend sends POST `/api/ask-ai`\
4.  Backend calls OpenRouter\
5.  AI returns response\
6.  Result updates in **Result Node**\
7.  User can **Save** to MongoDB

------------------------------------------------------------------------

## ⚠️ Notes

-   Free models may be unstable; using `openrouter/auto` improves
    reliability
-   API keys are handled securely in the backend

------------------------------------------------------------------------

## 👨‍💻 Author

**Abhishek KV** - MERN Developer

------------------------------------------------------------------------
