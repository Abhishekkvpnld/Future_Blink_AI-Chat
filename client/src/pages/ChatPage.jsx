import React, { useState, useCallback } from "react";
import ControlPanel from "../components/ControlPanel";
import FlowCanvas from "../components/FlowCanvas";
import axios from "axios";

export const ChatPage = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Use useCallback so the function reference is stable for node data
  const handleInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const nodes = [
    {
      id: "1",
      type: "inputNode",
      position: { x: 100, y: 100 },
      data: { input, setInput: handleInputChange },
    },
    {
      id: "2",
      type: "resultNode",
      position: { x: 500, y: 100 },
      data: { result },
    },
  ];

  const edges = [{ id: "e1-2", source: "1", target: "2" }];

  const runFlow = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ask-ai`,
        { prompt: input }
      );

      const answer = res?.data?.answer;
      setResult(answer);
    } catch (err) {
      console.error(err);
      setResult("Error: Failed to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/save`, {
        prompt: input,
        response: result,
      });
      alert("Saved!");
    } catch (err) {
      console.error(err);
      alert("Save failed!");
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center gap-10 p-5 flex-col md:flex-row">
      <div className="flex-1 w-full h-full min-h-[500px] relative">
        <FlowCanvas nodes={nodes} edges={edges} />
        <ControlPanel runFlow={runFlow} saveData={saveData} loading={loading} />
      </div>
    </div>
  );
};

export default ChatPage;