import { getSvgPath } from '../../src/utils';

describe('top', () => {
  const source = { x: 100, y: 100, direction: 'T' };

  describe('T -> T no selected target', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50 };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,60 L200,60 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100 };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,60 L200,60 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200 };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,60 L200,60 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50 };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,60 L50,60 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200 };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,60 L50,60 L50,200');
    });
  });

  describe('T -> T', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'T' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,30 L200,30 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'T' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L200,80 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'T' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L200,80 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'T' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,30 L50,30 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'T' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L50,80 L50,200');
    });
  });

  describe('T -> R', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'R' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,75 L220,75 L220,50 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'R' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L220,80 L220,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'R' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L220,80 L220,200 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'R' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'R' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L75,80 L75,200 L50,200');
    });
  });

  describe('T -> B', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'B' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,75 L200,75 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'B' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L200,80 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'B' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L150,80 L150,220 L200,220 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'B' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,75 L50,75 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'B' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L75,80 L75,220 L50,220 L50,200');
    });
  });

  describe('T -> L', () => {
    it('The target is at the top right of the source', async () => {
      const target = { x: 200, y: 50, direction: 'L' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,50 L200,50');
    });

    it('Target and source on horizontal line', async () => {
      const target = { x: 200, y: 100, direction: 'L' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L150,80 L150,100 L200,100');
    });

    it('The target is at the bottom right of the source', async () => {
      const target = { x: 200, y: 200, direction: 'L' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L150,80 L150,200 L200,200');
    });

    it('The target is at the top left of the source', async () => {
      const target = { x: 50, y: 50, direction: 'L' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,75 L30,75 L30,50 L50,50');
    });

    it('The target is at the bottom left of the source', async () => {
      const target = { x: 50, y: 200, direction: 'L' };
      const path = getSvgPath(source, target);
      expect(path).toBe('M100,100 L100,80 L30,80 L30,200 L50,200');
    });
  });
});
