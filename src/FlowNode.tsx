import React from 'react';

interface FlowNodeProps {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  // onAnchorMouseDown: (source: FlowNodeAnchorPosition) => void;
  onMove: (id: string, x: number, y: number) => void;
}

const FlowNode: React.FC<FlowNodeProps> = ({
  id,
  x,
  y,
  width = 160,
  height = 40,
  // onAnchorMouseDown,
  // onMove,
}) => {
  const ref = React.useRef(null);

  return (
    <div
      className="flow-node"
      title="审批节点"
      style={{ left: x, top: y, width, height }}
      // onMouseDown={handleMouseDown}
      // onMouseUp={handleMouseUp}
      ref={ref}
      data-nid={id}
    >
      <div className="flow-node-name">审批节点</div>
      <div className="flow-node-anchor" style={{ top: 0, left: width / 2 }} data-direction="T" />
      <div
        className="flow-node-anchor"
        style={{ top: height / 2, left: width }}
        data-direction="R"
      />
      <div
        className="flow-node-anchor"
        style={{ top: height, left: width / 2 }}
        data-direction="B"
      />
      <div className="flow-node-anchor" style={{ top: height / 2, left: 0 }} data-direction="L" />
    </div>
  );
};

export default FlowNode;
