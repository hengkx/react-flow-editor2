import { getLineNoArrow, getLine } from '../../../src/utils/svg';

describe('right', () => {
  const source = { x: 100, y: 100, direction: 'R' };

  describe('not target direction', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50 };
      const path = getLine(source, target);
      expect(path).toBe(
        'M100,100 L150,100 L150,50 L200,50 M200,50 L192,58 M200,50 L192,42 M200,50',
      );
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100 };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L150,100 L150,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200 };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L150,100 L150,200 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50 };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L140,100 L140,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200 };
      const path = getLine(source, target);
      expect(path).toBe(
        'M100,100 L140,100 L140,200 L50,200 M50,200 L58,192 M50,200 L58,208 M50,200',
      );
    });
  });

  describe('R -> T', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'T' };
      const path = getLine(source, target);
      expect(path).toBe(
        'M100,100 L150,100 L150,30 L200,30 L200,50 M200,50 L192,42 M200,50 L208,42 M200,50',
      );
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L150,100 L150,80 L200,80 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L200,100 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L120,100 L120,30 L50,30 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L120,100 L120,150 L50,150 L50,200');
    });
  });

  describe('R -> R', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'R' };
      const path = getLine(source, target);
      expect(path).toBe(
        'M100,100 L220,100 L220,50 L200,50 M200,50 L208,42 M200,50 L208,58 M200,50',
      );
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L220,100 L220,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L220,100 L220,200 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L120,100 L120,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L120,100 L120,200 L50,200');
    });
  });

  describe('R -> B', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'B' };
      const path = getLine(source, target);
      expect(path).toBe('M100,100 L200,100 L200,50 M200,50 L192,58 M200,50 L208,58 M200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L150,100 L150,120 L200,120 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L150,100 L150,220 L200,220 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L120,100 L120,75 L50,75 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L120,100 L120,220 L50,220 L50,200');
    });
  });

  describe('R -> L', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'L' };
      const path = getLine(source, target);
      expect(path).toBe(
        'M100,100 L150,100 L150,50 L200,50 M200,50 L192,58 M200,50 L192,42 M200,50',
      );
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L150,100 L150,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L150,100 L150,200 L200,200');
    });

    it('The target is at the bottom right of the source and less than margin', async () => {
      const target = { x: 110, y: 200, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L120,100 L120,150 L90,150 L90,200 L110,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L120,100 L120,75 L30,75 L30,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L120,100 L120,150 L30,150 L30,200 L50,200');
    });
  });
});
