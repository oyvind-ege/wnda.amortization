# wnda.amortization

This is a simple app that generates an amortization schedule based on a given loan type.

It consists of a lightweight server and a Svelte frontend. The frontend allows the user to choose downpayment schemes and loan types from dropdowns, as well as the desired duration of the loan and total loan amount.

## How to use

For Unix-based systems:

1. Clone the repo
2. `npm i && npm t` in root folder --> see tests pass
3. `cd ./client && npm i`
4. `npm run go`

## Extendibility

Loan types are defined in `./client/public/loan-types.json`. Whatever gets put in there appears in the dropdown menu.

Schemes (essentially payback schemes) are listed in `.client/src/schemes/schemes.js`. That list also appears in the first dropdown of the app. 
The core functionality/algorithm of each scheme is implemented in `.client/src/schemes/funcs.js`.
