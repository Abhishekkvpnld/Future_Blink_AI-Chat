# AI Flow Builder (MERN + React Flow + OpenRouter)

A full-stack AI-powered web application that allows users to create a
flow-based interface where input is processed through an AI model and
displayed visually using nodes.

## Features

-   AI-powered responses using OpenRouter API\
-   Flow-based UI using React Flow\
-   Input node for user queries\
-   Result node for AI responses\
-   Save prompt & response to MongoDB\
-   Built with MERN stack\
-   Styled with Tailwind CSS

## Tech Stack

Frontend: React, React Flow, Tailwind CSS\
Backend: Node.js, Express.js\
Database: MongoDB, Mongoose\
AI: OpenRouter API

## Project Structure

project/ ├── client/ ├── server/ ├── .env └── README.md

## Setup

### Backend

cd server npm install

Create .env: PORT=5000 MONGO_URI=your_mongodb_connection
OPENROUTER_API_KEY=your_api_key AI_MODEL_URL=openrouter/auto

npm run dev

### Frontend

cd client npm install npm run dev

## API

POST /api/ask-ai POST /api/save

## Flow

User → Input Node → Backend → OpenRouter → Response → Result Node

## Author

Abhishek KV
