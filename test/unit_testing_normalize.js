// Author: Ariel Zhu
// Created: 7/3/18
// Edit: N/A
// Description: normalize numbers and scientific notations to five decimal places
// Testing Plan
// 1. float with 0-5 decimal places before ending zero will truncate ending zeros
//   a. all decimal places are ending zeros
//   b. decimal places after first decimal place are ending zeros
//   c. decimal places after second decimal place are ending zeros
//   d. decimal places after third decimal place are ending zeros
//   b. decimal places after forth decimal place are ending zeros
//   c. decimal places after fifth decimal place are ending zeros
// 2. float with more than 5 decimal places before ending zeros will limit to 5 decimal places
// 3. scitific notation with 0-5 decimal places before ending zero will truncate ending zeros
// 4. scientific notation with more than 5 decimal places before ending zeros will limit to 5 decimal places
// 5. numbers should round correctly
describe("normalize", function(){
  it('float should truncate ending zeros',function(){
    expect(normalize(0.0).toString()).toBe('0');
    expect(normalize(1.0000000).toString()).toBe("1");
    expect(normalize(1.1000000).toString()).toBe("1.1");
    expect(normalize(1.0100000).toString()).toBe("1.01");
    expect(normalize(1.0010000).toString()).toBe("1.001");
    expect(normalize(1.0001000).toString()).toBe("1.0001");
    expect(normalize(1.00001000).toString()).toBe("1.00001");
    expect(normalize(1.11111000).toString()).toBe("1.11111");
    expect(normalize(1.0000000).toString()).not.toBe("1.00000");
    expect(normalize(1.1000000).toString()).not.toBe("1.10000");
    expect(normalize(1.0100000).toString()).not.toBe("1.01000");
    expect(normalize(1.0010000).toString()).not.toBe("1.00100");
    expect(normalize(1.0001000).toString()).not.toBe("1.00010");
    expect(normalize(1.00001000).toString()).not.toBe("1.00000");
  })
  it('float should have five decimals', function(){
    expect(normalize(2.222222).toString()).toBe('2.22222');
    expect(normalize(2.2222222).toString()).toBe('2.22222');
    expect(normalize(2.22222222).toString()).toBe('2.22222');
    expect(normalize(2.2222222).toString()).toBe('2.22222');
    expect(normalize(2.22222222).toString()).toBe('2.22222');
    expect(normalize(-2.222222).toString()).toBe('-2.22222');
    expect(normalize(-2.2222222).toString()).toBe('-2.22222');
    expect(normalize(-2.22222222).toString()).toBe('-2.22222');
    expect(normalize(-2.2222222).toString()).toBe('-2.22222');
    expect(normalize(-2.22222222).toString()).toBe('-2.22222');
  });
  it('scientific notation should truncate zeros', function(){
    expect(normalize(3.00000e+53)).toBe(3e+53);
    expect(normalize(3.01000e+53)).toBe(3.01e+53);
    expect(normalize(3.00100e+53)).toBe(3.001e+53);
    expect(normalize(3.00010e+53)).toBe(3.0001e+53);
    expect(normalize(3.0000100000e+53)).toBe(3.00001e+53);
    expect(normalize(-3.00000e+53)).toBe(-3e+53);
    expect(normalize(-3.01000e+53)).toBe(-3.01e+53);
    expect(normalize(-3.00100e+53)).toBe(-3.001e+53);
    expect(normalize(-3.00010e+53)).toBe(-3.0001e+53);
    expect(normalize(-3.0000100000e+53)).toBe(-3.00001e+53);
  });
  it('scientific notation should have five decimals', function(){
    expect(normalize(-3.46436e+53)).toBe(-3.46436e+53);
    expect(normalize(3.46436e+53)).toBe(3.46436e+53);
    expect(normalize(-3.46436222e+53)).toBe(-3.46436e+53);
    expect(normalize(3.46436222e+53)).toBe(3.46436e+53);
    expect(normalize(3.000011e+53)).toBe(3.00001e+53);
  });
  it('float should be round correctly', function(){
    expect(normalize(0.000002).toString()).toBe('0');
    expect(normalize(0.000006).toString()).toBe('0.00001');
    expect(normalize(2.000011).toString()).toBe('2.00001');
    expect(normalize(2.000019).toString()).toBe('2.00002');
    expect(normalize(-0.000002).toString()).toBe('0');
    expect(normalize(-0.000009).toString()).toBe('-0.00001');
    expect(normalize(3.000001e+53)).toBe(3e+53);
    expect(normalize(3.000009e+53)).toBe(3.00001e+53);
  });
});
