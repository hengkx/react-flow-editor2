export type Direction = 'T' | 'R' | 'B' | 'L';

export interface FlowNodeAnchorPosition {
  id: string;
  x: number;
  y: number;
  direction: Direction;
}

// export interface FlowEdgeType extends FlowNodeEdgePosition {
//   id: string;
//   direction: Direction;
// }
