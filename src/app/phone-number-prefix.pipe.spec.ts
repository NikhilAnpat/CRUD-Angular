import { PhoneNumberPrefixPipe } from './phone-number-prefix.pipe';

describe('PhoneNumberPrefixPipe', () => {
  it('create an instance', () => {
    const pipe = new PhoneNumberPrefixPipe();
    expect(pipe).toBeTruthy();
  });
});
