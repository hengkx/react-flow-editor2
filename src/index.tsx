import React, { useState, useEffect } from 'react';
// import { PlayCircleOutlined, LogoutOutlined, ForkOutlined } from '@ant-design/icons';
import FlowNode from './FlowNode';
import './less/index.less';
import { getTargetPosition, getSvgPath, getNodeAnchorPosition, getNodeDom } from './utils';
import { FlowNodeAnchorPosition, Direction } from './interface';

interface FlowNode {
  id: string;
  x: number;
  y: number;
}

interface FlowEdge {
  source: FlowNodeAnchorPosition;
  target?: FlowNodeAnchorPosition;
}

interface FlowEditorData {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

interface ReactFlowEditorProps {
  data: FlowEditorData;
}

interface SelectedNode {
  id: string;
  offsetX: number;
  offsetY: number;
  current: any;
}

const ReactFlowEditor: React.FC<ReactFlowEditorProps> = ({ data }) => {
  // const ref = React.useRef(null);
  const svgRef = React.useRef(null);
  const [moveEdge, setMoveEdge] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNode>();
  const itemsRef = React.useRef([]);

  const [edges, setEdges] = useState<FlowEdge[]>(data.edges);

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
            current.childNodes[0].setAttribute('d', getSvgPath(source, item.target));
          } else if (item.target.id === id) {
            const target = getNodeAnchorPosition(selectedNode.current, item.target.direction);
            current.childNodes[0].setAttribute('d', getSvgPath(item.source, target));
          }
        }
      } else {
        const { current } = itemsRef.current[itemsRef.current.length - 1];
        const { source } = edges[edges.length - 1];
        const targetPosition = getTargetPosition(e, source.id);
        current.childNodes[0].setAttribute('d', getSvgPath(source, targetPosition));
      }
    };
    if (moveEdge || selectedNode) {
      window.addEventListener('mousemove', handleAnchorMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleAnchorMouseMove);
    };
  }, [moveEdge, edges, selectedNode]);

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
      const targetPosition = getTargetPosition(e);
      if (targetPosition.direction) {
        newEdges[newEdges.length - 1].target = targetPosition as FlowNodeAnchorPosition;
      } else {
        newEdges.pop();
        itemsRef.current.pop();
      }
      setMoveEdge(false);
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

  return (
    <div className="flow" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {data.nodes.map(item => (
        <FlowNode key={item.id} id={item.id} x={item.x} y={item.y} onMove={handleMove} />
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
