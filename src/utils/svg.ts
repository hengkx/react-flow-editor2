import { Direction, FlowNodeAnchorPosition } from '../interface';

/**
 * 获取线段的箭头
 *
 * @param {FlowNodeAnchorPosition} source
 * @param {FlowNodeAnchorPosition} target
 * @param {number} [minRange=40]
 * @returns {string}
 */
function getLineArrow(
  source: FlowNodeAnchorPosition,
  target: FlowNodeAnchorPosition,
  minRange = 40,
): string {
  const { x, y, direction } = source;
  const { x: endX, y: endY, direction: endDirection } = target;
  let arrowDirection: Direction;
  if (endDirection) {
    arrowDirection = getReverseDirection(endDirection);
  } else if (direction === 'T') {
    arrowDirection = endY < y - minRange ? 'T' : 'B';
  } else if (direction === 'B') {
    arrowDirection = endY < y + minRange ? 'T' : 'B';
  } else if (direction === 'R') {
    arrowDirection = endX > x + minRange ? 'R' : 'L';
  } else {
    arrowDirection = endX > x - minRange ? 'R' : 'L';
  }
  return getArrow(endX, endY, arrowDirection);
}

/**
 * 获取反方向
 *
 * @param {Direction} direction
 * @returns {Direction}
 */
function getReverseDirection(direction: Direction): Direction {
  if (direction === 'T') {
    return 'B';
  }
  if (direction === 'R') {
    return 'L';
  }
  if (direction === 'B') {
    return 'T';
  }
  return 'R';
}

/**
 * 获取箭头路径
 *
 * @export
 * @param {number} x
 * @param {number} y
 * @param {Direction} [direction='B']
 * @param {number} [size=8]
 * @returns {string}
 */
export function getArrow(
  x: number,
  y: number,
  direction: Direction = 'B',
  size: number = 8,
): string {
  const points = [`M${x},${y}`];
  if (direction === 'T') {
    points.push(`L${x - size},${y + size}`);
    points.push(`M${x},${y}`);
    points.push(`L${x + size},${y + size}`);
  } else if (direction === 'B') {
    points.push(`L${x - size},${y - size}`);
    points.push(`M${x},${y}`);
    points.push(`L${x + size},${y - size}`);
  } else if (direction === 'R') {
    points.push(`L${x - size},${y + size}`);
    points.push(`M${x},${y}`);
    points.push(`L${x - size},${y - size}`);
  } else {
    points.push(`L${x + size},${y - size}`);
    points.push(`M${x},${y}`);
    points.push(`L${x + size},${y + size}`);
  }
  points.push(`M${x},${y}`);
  return points.join(' ');
}

/**
 * 是否需要反转path
 *
 * @param {FlowNodeAnchorPosition} source
 * @param {FlowNodeAnchorPosition} target
 * @returns
 */
function isReversePath(source: FlowNodeAnchorPosition, target: FlowNodeAnchorPosition) {
  const direction = `${source.direction}${target.direction}`;
  return ['RT', 'BT', 'LT', 'BR', 'LR', 'LB'].indexOf(direction) !== -1;
}

/**
 * 获取线段路径(代码需要重构)
 *
 * @export
 * @param {FlowNodeAnchorPosition} source 源节点位置
 * @param {FlowNodeAnchorPosition} target 目标节点位置
 * @returns {string} 路径
 */
export function getLineNoArrow(
  source: FlowNodeAnchorPosition,
  target: FlowNodeAnchorPosition,
  minRange = 40,
): string {
  const reverse = isReversePath(source, target);
  const { x, y, direction } = reverse ? target : source;
  const { x: endX, y: endY, direction: endDirection } = reverse ? source : target;

  let paths = [`${reverse ? 'L' : 'M'}${x},${y}`];
  const midX = (x + endX) / 2;
  const midY = (y + endY) / 2;
  const margin = endDirection ? minRange / 2 : minRange;
  if (direction === endDirection) {
    if (direction === 'T' || direction === 'B') {
      const value = direction === 'T' ? Math.min(y, endY) - margin : Math.max(y, endY) + margin;
      paths.push(`L${x},${value}`);
      paths.push(`L${endX},${value}`);
    } else {
      const value = direction === 'R' ? Math.max(x, endX) + margin : Math.min(x, endX) - margin;
      paths.push(`L${value},${y}`);
      paths.push(`L${value},${endY}`);
    }
  } else if (!endDirection || ['TB', 'RL'].indexOf(`${direction}${endDirection}`) !== -1) {
    if (direction === 'T') {
      const value = Math.min(y - margin, midY);
      paths.push(`L${x},${value}`);
      if (endY > y - minRange && endDirection === 'B') {
        paths.push(`L${midX},${value}`);
        paths.push(`L${midX},${endY + margin}`);
        paths.push(`L${endX},${endY + margin}`);
      } else {
        paths.push(`L${endX},${value}`);
      }
    } else if (direction === 'B') {
      const value = Math.max(y + margin, midY);
      paths.push(`L${x},${value}`);
      paths.push(`L${endX},${value}`);
    } else if (direction === 'R') {
      const value = Math.max(x + margin, midX);
      paths.push(`L${value},${y}`);
      if (endX < x + minRange && endDirection === 'L') {
        paths.push(`L${value},${midY}`);
        paths.push(`L${endX - margin},${midY}`);
        paths.push(`L${endX - margin},${endY}`);
      } else {
        paths.push(`L${value},${endY}`);
      }
    } else {
      const value = Math.min(x - margin, midX);
      paths.push(`L${value},${y}`);
      paths.push(`L${value},${endY}`);
    }
  } else if (direction === 'T' || direction === 'B') {
    if (
      (direction === 'T' && endDirection === 'R' && endX < x && endY < y) ||
      (direction === 'T' && endDirection === 'L' && endX > x && endY < y) ||
      (direction === 'B' && endDirection === 'L' && endX > x && endY > y)
    ) {
      paths.push(`L${x},${endY}`);
    } else {
      let value = 0;
      if (direction === 'T') {
        value = Math.min(y - margin, midY);
      } else {
        value = Math.max(y + margin, midY);
      }
      paths.push(`L${x},${value}`);
      let mx = 0;
      if (endDirection === 'R') {
        mx = Math.max(midX, endX + margin);
      } else {
        mx = Math.min(midX, endX - margin);
      }
      paths.push(`L${mx},${value}`);
      paths.push(`L${mx},${endY}`);
    }
  } else if (direction === 'R' && endDirection === 'B' && endX > x && endY < y) {
    paths.push(`L${endX},${y}`);
  } else {
    const value = Math.max(x + margin, midX);
    paths.push(`L${value},${y}`);
    const my = Math.max(midY, endY + margin);
    paths.push(`L${value},${my}`);
    paths.push(`L${endX},${my}`);
  }
  paths.push(`${reverse ? 'M' : 'L'}${endX},${endY}`);
  if (reverse) {
    paths = paths.reverse();
  }
  return paths.join(' ');
}

export function getLine(
  source: FlowNodeAnchorPosition,
  target: FlowNodeAnchorPosition,
  minRange = 40,
): string {
  return `${getLineNoArrow(source, target, minRange)} ${getLineArrow(source, target)}`;
}
