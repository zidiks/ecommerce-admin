import { ApiLoadingStatePipe } from './api-loading-state.pipe';

describe('ApiLoadingStatePipe', () => {
  it('create an instance', () => {
    const pipe = new ApiLoadingStatePipe();
    expect(pipe).toBeTruthy();
  });
});
