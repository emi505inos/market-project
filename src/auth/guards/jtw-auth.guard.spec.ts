import { JtwAuthGuard } from './jtw-auth.guard';

describe('JtwAuthGuard', () => {
  it('should be defined', () => {
    expect(new JtwAuthGuard()).toBeDefined();
  });
});
