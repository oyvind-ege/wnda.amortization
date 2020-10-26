import * as testMatrix from './data/test-data';
import * as utilities from '../client/src/util/utilities';


describe('monthNumberToDate', () => {
  test('should return February 2020 if n=1 and initialDate is Jan 2020', () => {
    const d = new Date('2020-01-01T00:00');
    const expected = new Date('2020-02-01T00:00').toLocaleDateString();
    expect(utilities.monthNumberToDate(1, d)).toBe(expected);
  });
  test('should return October 2045 if n=300 and initialDate is Oct 2020', () => {
    const d = new Date('2020-08-01T00:00');
    const expected = new Date('2045-08-01T00:00').toLocaleDateString();
    expect(utilities.monthNumberToDate(300, d)).toBe(expected);
  });
});

describe('sumBottomLine', () => {
  testMatrix.sumBottomLineTestMatrix.forEach((testData) => {
    test(`basic matrix`, () => {
      expect(utilities.sumBottomLine(testData.input)).toEqual(testData.expected);
    });
  });
});

describe('calcPrincipalPayment', () => {
  testMatrix.calcPrincipalPaymentTestMatrix.forEach((testData) => {
    test(`input: ${testData.input}, expected: ${testData.expected}`, () => {
      const precise = utilities.calcPrincipalPayment(...testData.input);
      expect(utilities.toTwoDecimals(precise)).toBe(testData.expected);
    });
  });
});

describe('calcTotalMonthlyPayment', () => {
  testMatrix.totalMonthlyPaymentTestMatrix.forEach((testData) => {
    test(`input: ${testData.input}, expected: ${testData.expected}`, () => {
      const precise = utilities.calcTotalMonthlyPayment(...testData.input);
      expect(utilities.toTwoDecimals(precise)).toBe(testData.expected);
    });
  });
});

