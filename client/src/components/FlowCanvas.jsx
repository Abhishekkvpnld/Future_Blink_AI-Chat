import ReactFlow, { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

import InputNode from "./InputNode";
import ResultNode from "./ResultNode";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

export default function FlowCanvas({ nodes, edges }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          className="bg-gray-200"
          fitView
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
        />
      </ReactFlowProvider>
    </div>
  );
}