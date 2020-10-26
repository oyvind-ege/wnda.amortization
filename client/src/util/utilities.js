/**
 * Transforms a common interest denomination (e.g. "3.5") into a normalized interest denomination: "0.035"
 * @param {Number}
 * @returns {Number}
 * */
export const normalizeInterest = (interest) => interest / 100;

export const toTwoDecimals = (number) => {
  return Math.round(number * 1e2) / 1e2;
};

export const monthNumberToDate = (n, initialDate) => {
  const d = new Date(initialDate);
  d.setMonth(initialDate.getMonth() + n);
  return d.toLocaleDateString();
};

export const sumBottomLine = (data) => {
  return data.reduce((acc, curr) => {
    return {
      interest: acc.interest + curr.interest,
      principal: acc.principal + curr.principal,
      outstanding: acc.outstanding + curr.outstanding,
    };
  });
};

export const calcTotalMonthlyPayment = (
  totalPaymentDue,
  monthlyNormalizedInterest,
  numberOfPayments
) => {
  const preciseResult =
    totalPaymentDue *
    ((monthlyNormalizedInterest *
      (1 + monthlyNormalizedInterest) ** numberOfPayments) /
      ((1 + monthlyNormalizedInterest) ** numberOfPayments - 1));
  return preciseResult;
};

/* Principal Payment = Total Monthly Payment – [Outstanding Loan Balance x (Interest Rate / 12 Months)] */
export const calcPrincipalPayment = (
  totalMonthlyPayment,
  normalizedInterest,
  outstandingBalance
) => {
  const preciseResult =
    totalMonthlyPayment - outstandingBalance * normalizedInterest;
  return preciseResult;
};
