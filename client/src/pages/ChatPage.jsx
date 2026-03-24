import React, { useState, useCallback } from "react";
import ControlPanel from "../components/ControlPanel";
import FlowCanvas from "../components/FlowCanvas";
import axios from "axios";

export const ChatPage = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // --- NEW STATE ---
  const [showSaved, setShowSaved] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);

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
        { prompt: input },
        { withCredentials: true }
      );
      setResult(res?.data?.answer);
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

  // --- NEW: fetch saved records ---
  const loadSaved = async () => {
    const next = !showSaved;
    setShowSaved(next);

    // Only fetch when opening the panel
    if (next) {
      setSavedLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/all`,
          { withCredentials: true }
        );
        setSavedData(res?.data ?? []);
      } catch (err) {
        console.error(err);
        setSavedData([]);
      } finally {
        setSavedLoading(false);
      }
    }
  };

  return (
  <div className="h-screen w-full bg-gray-100 flex flex-col p-5">

    {/* Canvas Area */}
    <div className="relative w-full h-full">
      <FlowCanvas nodes={nodes} edges={edges} />
      <ControlPanel runFlow={runFlow} saveData={saveData} loading={loading} />

      {/* FLOATING BUTTON */}
      <button
        onClick={loadSaved}
        className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg transition-all duration-150"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2H5z" />
        </svg>
        View Saved
      </button>
    </div>

    {/* MODAL OVERLAY */}
    {showSaved && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => setShowSaved(false)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-purple-50">
            <h2 className="text-base font-semibold text-purple-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2H5z" />
              </svg>
              Saved Conversations
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-purple-400">
                {!savedLoading && `${savedData.length} record${savedData.length !== 1 ? "s" : ""}`}
              </span>
              <button
                onClick={() => setShowSaved(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto space-y-4">
            {savedLoading ? (
              <div className="flex items-center justify-center py-10 text-gray-400 text-sm">
                <svg className="animate-spin w-5 h-5 mr-2 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Loading saved data...
              </div>
            ) : savedData.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-10">No saved conversations yet.</p>
            ) : (
              savedData.map((item, idx) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-4 bg-gray-50 hover:bg-purple-50 transition-colors space-y-3">
                  <div>
                    <span className="inline-block text-xs font-semibold text-purple-500 uppercase tracking-wide mb-1">
                      Prompt
                    </span>
                    <p className="text-sm text-gray-700">{item.prompt}</p>
                  </div>
                  <div className="border-t pt-3">
                    <span className="inline-block text-xs font-semibold text-green-500 uppercase tracking-wide mb-1">
                      Response
                    </span>
                    <p className="text-sm text-gray-600">{item.response}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 border-t bg-gray-50 flex justify-end">
            <button
              onClick={() => setShowSaved(false)}
              className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default ChatPage;