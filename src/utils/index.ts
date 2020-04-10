import { Direction, FlowNodeEdgePosition } from '../interface';

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

export function getNodeEdgePosition(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  direction: Direction,
): FlowNodeEdgePosition {
  const ele = getNodeDom(e);
  const { x, y, width, height } = getBoundingClientRect(ele);
  switch (direction) {
    case 'T':
      return { x: x + width / 2, y, direction };
    case 'R':
      return { x: x + width, y: height / 2, direction };
    case 'B':
      return { x: x + width / 2, y: y + height, direction };
    default:
      return { x, y: height / 2, direction };
  }
}

/**
 * 获取目标位置
 *
 * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e
 * @returns {FlowNodeEdgePosition}
 */
export function getTargetPosition(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
): FlowNodeEdgePosition {
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
 * 获取线段路径
 *
 * @export
 * @param {FlowNodeEdgePosition} source 源节点位置
 * @param {FlowNodeEdgePosition} target 目标节点位置
 * @returns {string} 路径
 */
export function getSvgPath(source: FlowNodeEdgePosition, target: FlowNodeEdgePosition): string {
  //   console.log(source, target);
  const { x, y, direction } = source;
  const { x: endX, y: endY, direction: endDirection } = target;
  const paths = [`M${x},${y}`];
  if (!endDirection) {
    const midY = (y + endY) / 2;
    switch (direction) {
      case 'T':
        break;
      case 'R':
        break;
      case 'B':
        if (endY > y) {
          paths.push(`L${x},${midY}`);
          paths.push(`L${endX},${midY}`);
        }
        break;
      case 'L':
        break;
      default:
        break;
    }
  } else {
    switch (direction) {
      case 'T':
        break;
      case 'R':
        break;
      case 'B':
        if (endY > y) {
          paths.push(`L${x},${endY}`);
        }
        break;
      case 'L':
        break;
      default:
        break;
    }
  }
  paths.push(`L${endX},${endY}`);
  return paths.join(' ');
}
