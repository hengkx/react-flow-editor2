import { Direction, FlowNodeAnchorPosition } from '../interface';

/**
 * 获取元素的坐标和宽高
 *
 * @param {HTMLElement} ele
 * @returns
 */
function getBoundingClientRect(ele: HTMLElement) {
  const { width, height } = ele.getBoundingClientRect();
  const x = parseInt(ele.style.left.replace('px', ''), 10);
  const y = parseInt(ele.style.top.replace('px', ''), 10);
  return { x, y, width, height };
}

export function getNodeDom(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const target = e.target as HTMLElement;
  if (target.tagName === 'DIV' && target.className.indexOf('flow-node') !== -1) {
    let ele = target;
    if (target.className !== 'flow-node') {
      ele = target.parentNode as HTMLElement;
    }
    return ele;
  }
  return undefined;
}

export function getNodeAnchorPosition(
  ele: HTMLElement,
  direction: Direction,
): FlowNodeAnchorPosition {
  const id = ele.getAttribute('data-nid');
  const { x, y, width, height } = getBoundingClientRect(ele);
  switch (direction) {
    case 'T':
      return { id, x: x + width / 2, y, direction };
    case 'R':
      return { id, x: x + width, y: y + height / 2, direction };
    case 'B':
      return { id, x: x + width / 2, y: y + height, direction };
    default:
      return { id, x, y: y + height / 2, direction };
  }
}

/**
 * 获取目标位置
 *
 * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e
 * @returns {FlowNodeAnchorPosition}
 */
export function getTargetPosition(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  sourceId?: string,
): FlowNodeAnchorPosition {
  let endX = e.clientX;
  let endY = e.clientY;
  let direction: Direction;
  let id;
  const target = e.target as HTMLElement;
  if (target.tagName === 'DIV' && target.className.indexOf('flow-node') !== -1) {
    let ele = target;
    if (target.className !== 'flow-node') {
      ele = target.parentNode as HTMLElement;
    }
    id = ele.getAttribute('data-nid');
    if (sourceId === id) {
      return { id, direction, x: endX, y: endY };
    }
    const { x, y, width, height } = getBoundingClientRect(ele);
    const num = width / 3;
    if (e.clientX < x + num) {
      endX = x;
      endY = y + height / 2;
      direction = 'L';
    } else if (e.clientX > x + num * 2) {
      endX = x + width;
      endY = y + height / 2;
      direction = 'R';
    } else if (e.clientY > y + height / 2) {
      endX = x + width / 2;
      endY = y + height;
      direction = 'B';
    } else {
      endX = x + width / 2;
      endY = y;
      direction = 'T';
    }
  }
  return { id, direction, x: endX, y: endY };
}

/**
 * 获取线段路径(代码需要重构)
 *
 * @export
 * @param {FlowNodeAnchorPosition} source 源节点位置
 * @param {FlowNodeAnchorPosition} target 目标节点位置
 * @returns {string} 路径
 */
export function getSvgPath(
  source: FlowNodeAnchorPosition,
  target: FlowNodeAnchorPosition,
  minRange = 40,
): string {
  //   console.log(source, target);
  const { x, y, direction } = source;
  const { x: endX, y: endY, direction: endDirection } = target;
  const paths = [`M${x},${y}`];
  const midX = (x + endX) / 2;
  const midY = (y + endY) / 2;
  const margin = endDirection ? minRange / 2 : minRange;
  if (direction === endDirection) {
    if (direction === 'T') {
      const value = Math.min(y, endY) - margin;
      paths.push(`L${x},${value}`);
      paths.push(`L${endX},${value}`);
    } else if (direction === 'B') {
      const value = Math.max(y, endY) + margin;
      paths.push(`L${x},${value}`);
      paths.push(`L${endX},${value}`);
    } else if (direction === 'R') {
      const value = Math.max(x, endX) + margin;
      paths.push(`L${value},${y}`);
      paths.push(`L${value},${endY}`);
    } else if (direction === 'L') {
      const value = Math.min(x, endX) - margin;
      paths.push(`L${value},${y}`);
      paths.push(`L${value},${endY}`);
    }
  } else if (
    !endDirection ||
    ['TB', 'BT', 'RL', 'LR'].indexOf(`${direction}${endDirection}`) !== -1
  ) {
    if (direction === 'T') {
      const value = Math.min(y - margin, midY);
      paths.push(`L${x},${value}`);
      if (endY > y && endDirection === 'B') {
        paths.push(`L${midX},${value}`);
        paths.push(`L${midX},${endY + margin}`);
        paths.push(`L${endX},${endY + margin}`);
      } else {
        paths.push(`L${endX},${value}`);
      }
    } else if (direction === 'B') {
      const value = Math.max(y + margin, midY);
      paths.push(`L${x},${value}`);
      if (endY < y && endDirection === 'T') {
        paths.push(`L${midX},${value}`);
        paths.push(`L${midX},${endY - margin}`);
        paths.push(`L${endX},${endY - margin}`);
      } else {
        paths.push(`L${endX},${value}`);
      }
    } else if (direction === 'R') {
      const value = Math.max(x + margin, midX);
      paths.push(`L${value},${y}`);
      if (endX < x && endDirection === 'L') {
        paths.push(`L${value},${midY}`);
        paths.push(`L${endX - margin},${midY}`);
        paths.push(`L${endX - margin},${endY}`);
      } else {
        paths.push(`L${value},${endY}`);
      }
    } else if (direction === 'L') {
      const value = Math.min(x - margin, midX);
      paths.push(`L${value},${y}`);
      if (endX > x && endDirection === 'R') {
        paths.push(`L${value},${midY}`);
        paths.push(`L${endX + margin},${midY}`);
        paths.push(`L${endX + margin},${endY}`);
      } else {
        paths.push(`L${value},${endY}`);
      }
    }
  } else if (direction === 'T') {
    if (
      (endDirection === 'R' && endX < x && endY < y) ||
      (endDirection === 'L' && endX > x && endY < y)
    ) {
      paths.push(`L${x},${endY}`);
    } else {
      const value = Math.min(y - margin, midY);
      paths.push(`L${x},${value}`);
      if (endDirection === 'R') {
        const v = Math.max(midX, endX + margin);
        paths.push(`L${v},${value}`);
        paths.push(`L${v},${endY}`);
      } else {
        const v = Math.min(midX, endX - margin);
        paths.push(`L${v},${value}`);
        paths.push(`L${v},${endY}`);
      }
    }
  } else if (direction === 'B') {
    if (
      (endDirection === 'R' && endX < x && endY > y) ||
      (endDirection === 'L' && endX > x && endY > y)
    ) {
      paths.push(`L${x},${endY}`);
    } else {
      const value = Math.max(y + margin, midY);
      paths.push(`L${x},${value}`);
      if (endDirection === 'R') {
        const v = Math.max(midX, endX + margin);
        paths.push(`L${v},${value}`);
        paths.push(`L${v},${endY}`);
      } else {
        const v = Math.min(midX, endX - margin);
        paths.push(`L${v},${value}`);
        paths.push(`L${v},${endY}`);
      }
    }
  } else if (direction === 'R') {
    if (
      (endDirection === 'T' && endX > x && endY > y) ||
      (endDirection === 'B' && endX > x && endY < y)
    ) {
      paths.push(`L${endX},${y}`);
    } else {
      const value = Math.max(x + margin, midX);
      paths.push(`L${value},${y}`);
      if (endDirection === 'T') {
        const v = Math.min(midY, endY - margin);
        paths.push(`L${value},${v}`);
        paths.push(`L${endX},${v}`);
      } else {
        const v = Math.max(midY, endY + margin);
        paths.push(`L${value},${v}`);
        paths.push(`L${endX},${v}`);
      }
    }
  } else if (direction === 'L') {
    if (
      (endDirection === 'T' && endX < x && endY > y) ||
      (endDirection === 'B' && endX < x && endY < y)
    ) {
      paths.push(`L${endX},${y}`);
    } else {
      const value = Math.min(x - margin, midX);
      paths.push(`L${value},${y}`);
      if (endDirection === 'T') {
        const v = Math.min(midY, endY - margin);
        paths.push(`L${value},${v}`);
        paths.push(`L${endX},${v}`);
      } else {
        const v = Math.max(midY, endY + margin);
        paths.push(`L${value},${v}`);
        paths.push(`L${endX},${v}`);
      }
    }
  }
  paths.push(`L${endX},${endY}`);
  return paths.join(' ');
}

// /**
//  * 获取Anchor方向
//  *
//  * @export
//  * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e
//  * @returns {Direction}
//  */
// export function getAnchorDirection(e: React.MouseEvent<HTMLDivElement, MouseEvent>): Direction {

// }
