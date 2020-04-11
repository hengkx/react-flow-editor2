import React from 'react';
import ReactFlowEditor from '../src';

const data = {
  nodes: [
    { id: '1', x: 100, y: 100, type: 'start' },
    { id: '2', x: 300, y: 60, type: 'end' },
    // { id: '1', x: 100, y: 300, type: 'start' },
    // { id: '2', x: 100, y: 60, type: 'end' },
  ],
  edges: [],
};

const Demo = () => (
  <div>
    <ReactFlowEditor data={data} />
  </div>
);
export default Demo;
