export default function ControlPanel({
  runFlow,
  saveData,
  loading,
  saving,
}) {
  return (
    <div className="absolute top-5 left-5 z-10 bg-white p-4 rounded-2xl shadow-lg h-40 w-52">
      <h1 className="text-xl font-bold mb-3">AI Flow</h1>

      <button
        onClick={runFlow}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2 hover:bg-blue-600 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Running..." : "Run Flow"}
      </button>

      <button
        onClick={saveData}
        disabled={saving}
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}