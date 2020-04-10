import React, { useState, useEffect } from 'react';
import { PlayCircleOutlined, LogoutOutlined, ForkOutlined } from '@ant-design/icons';
import FlowNode from './FlowNode';
import './less/index.less';
import { getTargetPosition, getSvgPath, getNodeEdgePosition, getNodeDom } from './utils';
import { FlowEdgeType } from './interface';

interface FlowNode {
  id: string;
  x: number;
  y: number;
}

interface FlowEdge {
  source: FlowEdgeType;
  target?: FlowEdgeType;
}

interface FlowEditorData {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

interface ReactFlowEditorProps {
  data: FlowEditorData;
}

const ReactFlowEditor: React.FC<ReactFlowEditorProps> = ({ data }) => {
  // const ref = React.useRef(null);
  const svgRef = React.useRef(null);
  const [moveEdge, setMoveEdge] = useState(false);
  const itemsRef = React.useRef([]);

  const [edges, setEdges] = useState<FlowEdge[]>(data.edges);

  useEffect(() => {
    const handleAnchorMouseMove = e => {
      const targetPosition = getTargetPosition(e);
      const { current } = itemsRef.current[itemsRef.current.length - 1];
      const { source } = edges[edges.length - 1];
      current.childNodes[0].setAttribute('d', getSvgPath(source, targetPosition));
    };
    if (moveEdge) {
      window.addEventListener('mousemove', handleAnchorMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleAnchorMouseMove);
    };
  }, [moveEdge, edges]);

  const handleAnchorMouseDown = (source: FlowEdgeType) => {
    const newEdges = [...edges];
    newEdges.push({ source });
    for (let i = 0; i < newEdges.length; i += 1) {
      itemsRef.current[i] = itemsRef.current[i] || React.createRef();
    }
    setEdges(newEdges);
    setMoveEdge(true);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const newEdges = [...edges];
    if (moveEdge) {
      const targetPosition = getTargetPosition(e);
      if (targetPosition.direction) {
        newEdges[newEdges.length - 1].target = targetPosition as FlowEdgeType;
      } else {
        newEdges.pop();
        itemsRef.current.pop();
      }
      setMoveEdge(false);
    } else {
      const ele = getNodeDom(e);
      if (ele) {
        const id = ele.getAttribute('data-nid');
        for (let i = 0; i < newEdges.length; i += 1) {
          const item = newEdges[i];
          if (item.source.id === id) {
            item.source = { ...item.source, ...getNodeEdgePosition(e, item.source.direction) };
          } else if (item.target.id === id) {
            item.target = { ...item.target, ...getNodeEdgePosition(e, item.target.direction) };
          }
        }
      }
    }
    setEdges(newEdges);
  };

  const handleMove = (id: string, x: number, y: number) => {
    for (let i = 0; i < edges.length; i += 1) {
      const item = edges[i];
      const { current } = itemsRef.current[i];
      if (item.source.id === id) {
        current.childNodes[0].setAttribute('d', getSvgPath({ ...item.source, x, y }, item.target));
      } else if (item.target.id === id) {
        current.childNodes[0].setAttribute('d', getSvgPath(item.source, { ...item.target, x, y }));
      }
    }
  };

  return (
    <div className="flow" onMouseUp={handleMouseUp}>
      <PlayCircleOutlined /> <LogoutOutlined />
      <ForkOutlined />
      {data.nodes.map(item => (
        <FlowNode
          key={item.id}
          id={item.id}
          x={item.x}
          y={item.y}
          onAnchorMouseDown={handleAnchorMouseDown}
          onMove={handleMove}
        />
      ))}
      <svg ref={svgRef}>
        {edges.map((item, index) => (
          <g key={index} ref={itemsRef.current[index]}>
            <path stroke="#0db3a6" strokeWidth="2" fill="#fff" fillOpacity="0" />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ReactFlowEditor;
