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
