import { getLineNoArrow, getLine } from '../../../src/utils/svg';

describe('left', () => {
  const source = { x: 100, y: 100, direction: 'L' };

  describe('not target direction', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50 };
      const path = getLine(source, target);
      expect(path).toBe('M100,100 L60,100 L60,50 L200,50 M200,50 L192,58 M200,50 L192,42 M200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100 };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L60,100 L60,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200 };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L60,100 L60,200 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50 };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L60,100 L60,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200 };
      const path = getLine(source, target);
      expect(path).toBe('M100,100 L60,100 L60,200 L50,200 M50,200 L58,192 M50,200 L58,208 M50,200');
    });
  });

  describe('L -> T', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,30 L200,30 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,80 L200,80 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,150 L200,150 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L75,100 L75,30 L50,30 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L50,100 L50,200');
    });
  });

  describe('L -> R', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,75 L220,75 L220,50 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,100 L220,100 L220,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,150 L220,150 L220,200 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L75,100 L75,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L75,100 L75,200 L50,200');
    });
  });

  describe('L -> B', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,75 L200,75 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,120 L200,120 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,220 L200,220 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L50,100 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L75,100 L75,220 L50,220 L50,200');
    });
  });

  describe('L -> L', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,50 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L80,100 L80,200 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L30,100 L30,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L30,100 L30,200 L50,200');
    });
  });
});
