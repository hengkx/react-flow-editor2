import { getLineNoArrow, getLine } from '../../../src/utils/svg';

describe('bottom', () => {
  const source = { x: 100, y: 100, direction: 'B' };

  describe('not target direction', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50 };
      const path = getLine(source, target);
      expect(path).toBe(
        'M100,100 L100,140 L200,140 L200,50 M200,50 L192,58 M200,50 L208,58 M200,50',
      );
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100 };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,140 L200,140 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200 };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,150 L200,150 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50 };
      const path = getLine(source, target);
      expect(path).toBe('M100,100 L100,140 L50,140 L50,50 M50,50 L42,58 M50,50 L58,58 M50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200 };
      const path = getLine(source, target);
      expect(path).toBe(
        'M100,100 L100,150 L50,150 L50,200 M50,200 L42,192 M50,200 L58,192 M50,200',
      );
    });
  });

  describe('B -> T', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L150,120 L150,30 L200,30 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L150,120 L150,80 L200,80 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,150 L200,150 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L75,120 L75,30 L50,30 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,150 L50,150 L50,200');
    });
  });

  describe('B -> R', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L220,120 L220,50 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L220,120 L220,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,150 L220,150 L220,200 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L75,120 L75,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,200 L50,200');
    });
  });

  describe('B -> B', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L200,120 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L200,120 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,220 L200,220 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L50,120 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,220 L50,220 L50,200');
    });
  });

  describe('B -> L', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L150,120 L150,50 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L150,120 L150,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,200 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,120 L30,120 L30,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,150 L30,150 L30,200 L50,200');
    });
  });
});
