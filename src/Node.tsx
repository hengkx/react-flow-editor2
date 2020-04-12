import React from 'react';

export interface FlowNode {
  id: string;
  x: number;
  y: number;
  name?: string;
  width?: number;
  height?: number;
  type?: 'start' | 'end' | undefined;
}
export interface NodeProps extends FlowNode {
  onClick?: (data: FlowNode) => void;
}

function getNodeName({ type, name }: { type?: string; name?: string }) {
  if (name) {
    return name;
  }
  if (type === 'start') {
    return '开始节点';
  }
  if (type === 'end') {
    return '结束节点';
  }
  return '流程节点';
}

const Node: React.FC<NodeProps> = props => {
  const { id, x, y, width = 160, height = 40, onClick, ...others } = props;
  const handleClick = () => {
    if (onClick) {
      onClick(props);
    }
  };
  return (
    <div
      className="flow-node"
      style={{ left: x, top: y, width, height }}
      data-nid={id}
      onClick={handleClick}
    >
      <div className="flow-node-name">{getNodeName(others)}</div>
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

export default Node;
