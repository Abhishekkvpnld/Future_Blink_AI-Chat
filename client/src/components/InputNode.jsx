import { Handle, Position } from "reactflow";

export default function InputNode({ data }) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-md border w-64">
      <p className="font-semibold mb-2">Input</p>

      <input
        type="text"
        value={data.input}
        onChange={(e) => data.setInput(e.target.value)}
        placeholder="Ask something..."
        className="nodrag w-full border p-2 rounded-lg text-sm"
      />

      <Handle type="source" position={Position.Right} />
    </div>
  );
}