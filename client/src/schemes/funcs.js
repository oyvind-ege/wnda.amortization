import * as utilities from '../util/utilities';

export const generateAmortizedSchedule = (total, termInYears, loanType) => {
  let schedule = [];
  let outstanding = total;
  const numPayments = termInYears * loanType.paymentsPerYear;
  const periodicInterest =
    utilities.normalizeInterest(loanType.interest) / loanType.paymentsPerYear;
  const monthlyPayment = utilities.calcTotalMonthlyPayment(
    total,
    periodicInterest,
    numPayments
  );

  for (let i = 0; i <= numPayments; i += 1) {
    const interest = outstanding * periodicInterest;
    const principal = monthlyPayment - interest;
    schedule = [
      ...schedule,
      {
        principal: utilities.toTwoDecimals(principal),
        interest: utilities.toTwoDecimals(interest),
        outstanding: utilities.toTwoDecimals(outstanding),
      },
    ];
    outstanding -= principal;
  }
  return schedule;
};
