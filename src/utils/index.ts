import { Direction, NodeAnchorPosition, Offset } from '../interface';

export function getElementPos(ele: HTMLElement) {
  const x = parseInt(ele.style.left.replace('px', ''), 10);
  const y = parseInt(ele.style.top.replace('px', ''), 10);
  return { x, y };
}

/**
 * 获取元素的坐标和宽高
 *
 * @param {HTMLElement} ele
 * @returns
 */
function getBoundingClientRect(ele: HTMLElement) {
  const { width, height } = ele.getBoundingClientRect();
  const { x, y } = getElementPos(ele);
  return { x, y, width, height };
}

export function getNodeDom(e: React.MouseEvent) {
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

export function getNodeAnchorPosition(ele: HTMLElement, direction: Direction): NodeAnchorPosition {
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
 * @param {React.MouseEvent} e
 * @returns {NodeAnchorPosition}
 */
export function getTargetPosition(
  e: React.MouseEvent,
  offset: Offset,
  sourceId?: string,
): NodeAnchorPosition {
  const endX = e.clientX - offset.x;
  const endY = e.clientY - offset.y;
  let direction: Direction;
  let id;
  const ele = getNodeDom(e);
  if (ele) {
    id = ele.getAttribute('data-nid');
    if (sourceId === id) {
      return { id, direction, x: endX, y: endY };
    }
    const { x, y, width, height } = getBoundingClientRect(ele);
    const num = width / 3;
    if (endX < x + num) {
      direction = 'L';
    } else if (endX > x + num * 2) {
      direction = 'R';
    } else if (endY > y + height / 2) {
      direction = 'B';
    } else {
      direction = 'T';
    }
    return getNodeAnchorPosition(ele, direction);
  }
  return { id, direction, x: endX, y: endY };
}
