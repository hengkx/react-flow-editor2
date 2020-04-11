import { getLineNoArrow, getLine } from '../../../src/utils/svg';

describe('top', () => {
  const source = { x: 100, y: 100, direction: 'T' };

  describe('not target direction', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50 };
      const path = getLine(source, target);
      expect(path).toBe('M100,100 L100,60 L200,60 L200,50 M200,50 L192,58 M200,50 L208,58 M200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100 };
      const path = getLine(source, target);
      expect(path).toBe(
        'M100,100 L100,60 L200,60 L200,100 M200,100 L192,92 M200,100 L208,92 M200,100',
      );
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200 };
      const path = getLine(source, target);
      expect(path).toBe(
        'M100,100 L100,60 L200,60 L200,200 M200,200 L192,192 M200,200 L208,192 M200,200',
      );
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50 };
      const path = getLine(source, target);
      expect(path).toBe('M100,100 L100,60 L50,60 L50,50 M50,50 L42,58 M50,50 L58,58 M50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200 };
      const path = getLine(source, target);
      expect(path).toBe('M100,100 L100,60 L50,60 L50,200 M50,200 L42,192 M50,200 L58,192 M50,200');
    });
  });

  describe('T -> T', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'T' };
      const path = getLine(source, target);
      expect(path).toBe('M100,100 L100,30 L200,30 L200,50 M200,50 L192,42 M200,50 L208,42 M200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'T' };
      const path = getLine(source, target);
      expect(path).toBe(
        'M100,100 L100,80 L200,80 L200,100 M200,100 L192,92 M200,100 L208,92 M200,100',
      );
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L200,80 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,30 L50,30 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'T' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L50,80 L50,200');
    });
  });

  describe('T -> R', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,75 L220,75 L220,50 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L220,80 L220,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L220,80 L220,200 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'R' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L75,80 L75,200 L50,200');
    });
  });

  describe('T -> B', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,75 L200,75 L200,50');
    });

    it('The target is at the top right of the source and less than margin', async () => {
      const target = { x: 200, y: 90, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L150,80 L150,110 L200,110 L200,90');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L150,80 L150,120 L200,120 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L150,80 L150,220 L200,220 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,75 L50,75 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'B' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L75,80 L75,220 L50,220 L50,200');
    });
  });

  describe('T -> L', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,50 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L150,80 L150,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L150,80 L150,200 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,75 L30,75 L30,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'L' };
      const path = getLineNoArrow(source, target);
      expect(path).toBe('M100,100 L100,80 L30,80 L30,200 L50,200');
    });
  });
});
