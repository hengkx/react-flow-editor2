import React from 'react';
import { Direction, FlowEdgeType } from './interface';

interface FlowNodeProps {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  onAnchorMouseDown: (source: FlowEdgeType) => void;
  onMove: (id: string, x: number, y: number) => void;
}

const FlowNode: React.FC<FlowNodeProps> = ({
  id,
  x,
  y,
  width = 160,
  height = 40,
  onAnchorMouseDown,
  onMove,
}) => {
  const ref = React.useRef(null);

  let offsetX = 0;
  let offsetY = 0;

  const handleMouseMove = e => {
    ref.current.style.top = `${e.clientY - offsetY}px`;
    ref.current.style.left = `${e.clientX - offsetX}px`;
    onMove(id, e.clientX - offsetX, e.clientY - offsetY);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    offsetX = e.clientX - ref.current.offsetLeft;
    offsetY = e.clientY - ref.current.offsetTop;
    window.addEventListener('mousemove', handleMouseMove);
  };

  const handleMouseUp = () => {
    // e.stopPropagation();
    window.removeEventListener('mousemove', handleMouseMove);
  };

  const handleAnchorMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    direction: Direction,
  ) => {
    e.stopPropagation();
    let anchorX = 0;
    let anchorY = 0;
    switch (direction) {
      case 'T':
        anchorX = x + width / 2;
        anchorY = y;
        break;
      case 'R':
        anchorX = x + width;
        anchorY = y + height / 2;
        break;
      case 'B':
        anchorX = x + width / 2;
        anchorY = y + height;
        break;
      case 'L':
        anchorX = x;
        anchorY = y + height / 2;
        break;
      default:
        break;
    }
    onAnchorMouseDown({ id, direction, x: anchorX, y: anchorY });
  };

  return (
    <div
      className="flow-node"
      title="审批节点"
      style={{ left: x, top: y, width, height }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={ref}
      data-nid={id}
    >
      <div className="flow-node-name">审批节点</div>
      <div
        className="flow-node-anchor"
        style={{ top: 0, left: width / 2 }}
        onMouseDown={e => handleAnchorMouseDown(e, 'T')}
      />
      <div
        className="flow-node-anchor"
        style={{ top: height / 2, left: width }}
        onMouseDown={e => handleAnchorMouseDown(e, 'R')}
      />
      <div
        className="flow-node-anchor"
        style={{ top: height, left: width / 2 }}
        onMouseDown={e => handleAnchorMouseDown(e, 'B')}
      />
      <div
        className="flow-node-anchor"
        style={{ top: height / 2, left: 0 }}
        onMouseDown={e => handleAnchorMouseDown(e, 'L')}
      />
    </div>
  );
};

export default FlowNode;
