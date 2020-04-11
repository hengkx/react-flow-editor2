import { getArrow } from '../../src/utils/svg';

describe('svg', () => {
  describe('get arrow', () => {
    it('default', async () => {
      expect(getArrow(100, 100)).toBe('M100,100 L92,92 M100,100 L108,92 M100,100');
    });

    it('set direction T', async () => {
      expect(getArrow(100, 100, 'T')).toBe('M100,100 L92,108 M100,100 L108,108 M100,100');
    });

    it('set direction R', async () => {
      expect(getArrow(100, 100, 'R')).toBe('M100,100 L92,108 M100,100 L92,92 M100,100');
    });
    it('set direction L', async () => {
      expect(getArrow(100, 100, 'L')).toBe('M100,100 L108,92 M100,100 L108,108 M100,100');
    });

    it('set direction and size', async () => {
      expect(getArrow(100, 100, 'L', 50)).toBe('M100,100 L150,50 M100,100 L150,150 M100,100');
    });
  });
});
