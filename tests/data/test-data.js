export const totalMonthlyPaymentTestMatrix = [
  {
    input: [250000, 0.00375, 360],
    expected: 1266.71,
  },
  {
    input: [300000, 0.004375, 360],
    expected: 1656.61,
  },
  {
    input: [120000, 0.0020833333333333, 120],
    expected: 1131.24,
  },
];

export const calcPrincipalPaymentTestMatrix = [
  {
    input: [1266.71, 0.00375, 250000],
    expected: 329.21,
  },
  {
    input: [1656.61, 0.004375, 300000],
    expected: 344.11,
  },
  {
    input: [1131.24, 0.0020833333333333, 120000],
    expected: 881.24,
  },
];

export const sumBottomLineTestMatrix = [
  {
    input: [
      {
        interest: 10,
        principal: 15,
        outstanding: 30,
      },
      {
        interest: 5,
        principal: 20,
        outstanding: 15,
      },
      {
        interest: 0,
        principal: 10,
        outstanding: 5,
      },
    ],
    expected: {
      interest: 15,
      principal: 45,
      outstanding: 50,
    },
  },
]
