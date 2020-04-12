import React from 'react';
import ReactFlowEditor, { FlowEditorData } from '../src';

const data: FlowEditorData = {
  nodes: [
    { id: `${Date.now()}`, x: 100, y: 100, type: 'start' },
    { id: '2', x: 100, y: 300, type: 'end' },
  ],
  edges: [],
};

const handleChange = val => {
  console.log(val);
};

const Demo = () => (
  <div>
    <ReactFlowEditor data={data} onChange={handleChange} />
  </div>
);
export default Demo;
