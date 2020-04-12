import React from 'react';
import ReactFlowEditor, { FlowEditorData } from '../src';

const data: FlowEditorData = {
  edges: [
    {
      source: { x: 117, y: 48, id: '2084ccb0-7ccf-11ea-b575-892b84df2c6d', direction: 'B' },
      target: { x: 127, y: 121, id: '1586703966083', direction: 'T' },
    },
    {
      source: { x: 127, y: 161, id: '1586703966083', direction: 'B' },
      target: { x: 155, y: 251, id: '1586704192209', direction: 'T' },
    },
    {
      source: { x: 235, y: 271, id: '1586704192209', direction: 'R' },
      target: { x: 339, y: 217, id: '1586710304174', direction: 'B' },
    },
    {
      source: { x: 419, y: 197, id: '1586710304174', direction: 'R' },
      target: { x: 532, y: 256, id: '1586710304678', direction: 'T' },
    },
    {
      source: { x: 532, y: 296, id: '1586710304678', direction: 'B' },
      target: { x: 677, y: 316, id: '2084ccb1-7ccf-11ea-b575-892b84df2c6d', direction: 'L' },
    },
  ],
  nodes: [
    { x: 37, y: 8, id: '2084ccb0-7ccf-11ea-b575-892b84df2c6d', name: '已报名', type: 'start' },
    { x: 677, y: 296, id: '2084ccb1-7ccf-11ea-b575-892b84df2c6d', name: '已领证', type: 'start' },
    { x: 47, y: 121, id: '1586703966083', name: '科目一' },
    { x: 75, y: 251, id: '1586704192209', name: '科目二' },
    { x: 259, y: 177, id: '1586710304174', name: '科目三' },
    { x: 452, y: 256, id: '1586710304678', name: '科目四' },
  ],
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
