import { Handle, Position } from "reactflow";

export default function ResultNode({ data }) {
  return (
    <div className="bg-green-100 p-3 rounded-xl shadow-md border w-64">
      <p className="font-semibold mb-2">Result</p>

      <p className="text-sm">
        {data.result || "Waiting for result..."}
      </p>

      <Handle type="target" position={Position.Left} />
    </div>
  );
}