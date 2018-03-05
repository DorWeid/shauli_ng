import { HeroNameFilterPipe } from './hero-name-filter.pipe';

describe('HeroNameFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new HeroNameFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
