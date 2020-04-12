import React, { useState, useEffect } from 'react';
import Node, { FlowNode } from './Node';
import { getTargetPosition, getNodeAnchorPosition, getNodeDom } from './utils';
import { NodeAnchorPosition, Direction, Offset } from './interface';
import { getLine } from './utils/svg';
import './less/index.less';

interface FlowEdge {
  source: NodeAnchorPosition;
  target?: NodeAnchorPosition;
}

export interface FlowEditorData {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowEditorProps {
  data: FlowEditorData;
  onChange: (data: FlowEditorData) => void;
  onSelectNode?: (data: FlowNode) => void;
}

interface SelectedNode {
  id: string;
  offsetX: number;
  offsetY: number;
  current: any;
}

const FlowEditor: React.FC<FlowEditorProps> = ({ data, onChange, onSelectNode }) => {
  const containerRef = React.useRef(null);
  const svgRef = React.useRef(null);
  const [moveEdge, setMoveEdge] = useState(false);
  const [offset, setOffset] = useState<Offset>();
  const [selectedNode, setSelectedNode] = useState<SelectedNode>();
  const itemsRef = React.useRef([]);

  const [edges, setEdges] = useState<FlowEdge[]>(data.edges);
  const [nodes, setNodes] = useState<FlowNode[]>(data.nodes);

  useEffect(() => {
    const { left, top } = (containerRef.current as HTMLElement).getBoundingClientRect();
    setOffset({ x: left, y: top });
  }, [containerRef]);

  useEffect(() => {
    const handleAnchorMouseMove = e => {
      if (selectedNode) {
        const { id } = selectedNode;
        const top = Math.max(e.clientY - selectedNode.offsetY, 0);
        const left = Math.max(e.clientX - selectedNode.offsetX, 0);

        selectedNode.current.style.top = `${top}px`;
        selectedNode.current.style.left = `${left}px`;

        for (let i = 0; i < edges.length; i += 1) {
          const item = edges[i];
          const { current } = itemsRef.current[i];
          if (item.source.id === id) {
            const source = getNodeAnchorPosition(selectedNode.current, item.source.direction);
            current.childNodes[0].setAttribute('d', getLine(source, item.target));
          } else if (item.target.id === id) {
            const target = getNodeAnchorPosition(selectedNode.current, item.target.direction);
            current.childNodes[0].setAttribute('d', getLine(item.source, target));
          }
        }
      } else {
        const { current } = itemsRef.current[itemsRef.current.length - 1];
        const { source } = edges[edges.length - 1];
        const targetPosition = getTargetPosition(e, offset, source.id);
        current.childNodes[0].setAttribute('d', getLine(source, targetPosition));
      }
    };
    if (moveEdge || selectedNode) {
      window.addEventListener('mousemove', handleAnchorMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleAnchorMouseMove);
    };
  }, [moveEdge, edges, selectedNode, offset]);

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const newEdges = [...edges];
    if (selectedNode) {
      const ele = getNodeDom(e);
      if (ele) {
        const id = ele.getAttribute('data-nid');
        for (let i = 0; i < newEdges.length; i += 1) {
          const item = newEdges[i];
          if (item.source.id === id) {
            item.source = {
              ...item.source,
              ...getNodeAnchorPosition(selectedNode.current, item.source.direction),
            };
          } else if (item.target.id === id) {
            item.target = {
              ...item.target,
              ...getNodeAnchorPosition(selectedNode.current, item.target.direction),
            };
          }
        }
      }
      setSelectedNode(undefined);
    } else if (moveEdge) {
      const target = getTargetPosition(e, offset);
      const edge = newEdges[newEdges.length - 1];
      if (target.direction && edge.source.id !== target.id) {
        edge.target = target as NodeAnchorPosition;
      } else {
        newEdges.pop();
        itemsRef.current.pop();
      }
      setMoveEdge(false);
    }
    setEdges(newEdges);
    onChange({ nodes, edges: newEdges });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (target.className === 'flow-node-anchor') {
      const source = getNodeAnchorPosition(
        target.parentNode as HTMLElement,
        target.getAttribute('data-direction') as Direction,
      );
      const newEdges = [...edges];
      newEdges.push({ source });
      for (let i = 0; i < newEdges.length; i += 1) {
        itemsRef.current[i] = itemsRef.current[i] || React.createRef();
      }
      setEdges(newEdges);
      setMoveEdge(true);
    } else {
      const ele = getNodeDom(e);
      if (ele) {
        setSelectedNode({
          id: ele.getAttribute('data-nid'),
          offsetX: e.clientX - ele.offsetLeft,
          offsetY: e.clientY - ele.offsetTop,
          current: ele,
        });
      }
    }
  };

  const handleAddClick = () => {
    const newNodes = [...nodes];
    newNodes.push({ id: `${Date.now()}`, x: 200, y: 100, name: '流程节点' });
    setNodes(newNodes);
    onChange({ nodes: newNodes, edges });
  };

  return (
    <div className="flow">
      <div className="flow-toolbar">
        <button type="button" onClick={handleAddClick}>
          流程节点
        </button>
      </div>
      <div
        ref={containerRef}
        className="flow-container"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {nodes.map(item => (
          <Node key={item.id} {...item} onClick={onSelectNode} />
        ))}
        <svg ref={svgRef}>
          {edges.map((item, index) => (
            <g key={index} ref={itemsRef.current[index]}>
              <path stroke="#40a9ff" strokeWidth="2" fillOpacity={0} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default FlowEditor;
