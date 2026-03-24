export default function ControlPanel({ runFlow, saveData, loading }) {
  return (
    <div className="absolute top-5 left-5 z-10 bg-white p-4 rounded-2xl shadow-lg h-40 w-50">
      <h1 className="text-xl font-bold mb-3">AI Flow</h1>

      <button
        onClick={runFlow}
        className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2 hover:bg-blue-600"
      >
        {loading ? "Running..." : "Run Flow"}
      </button>

      <button
        onClick={saveData}
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
      >
        Save
      </button>
    </div>
  );
}