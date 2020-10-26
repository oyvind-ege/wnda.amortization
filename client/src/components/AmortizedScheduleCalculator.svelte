<script>
  import { onMount } from 'svelte';
  import * as utilities from '../util/utilities';
  import * as schemes from '../schemes/schemes';

  export let loanType;

  let calc;
  let result;
  let bottomLine;
  let error;
  let firstDueDate;

  let calculationData = {
    loanTerm: 0,
    loanAmount: 0,
    interest: 0,
    paymentsPerYear: 0,
  };

  let minimums = {
    loanTerm: 5,
    loanAmount: 20000,
    interest: 0,
    paymentsPerYear: 0,
  };

  const setupDueDate = () => {
    firstDueDate = new Date();
    firstDueDate.setMonth(firstDueDate.getMonth() + 1);
  };

  onMount(async () => {
    const res = await fetch('loan-types.json');
    calc = (await res.json()).find((type) => type.id == loanType);
    calculationData.interest = calc.interest;
    calculationData.paymentsPerYear = calc.paymentsPerYear;

    setupDueDate();
  });

  const validateInput = () => {
    for (const [key, value] of Object.entries(minimums)) {
      if (calculationData[key] < value) {
        console.log(`${key} is below minimum of ${value.toLocaleString()}`);
        error = `${key} is below minimum of ${value.toLocaleString()}`;
        return false;
      }
    }
    error = '';
    return true;
  };

  const generateSchedule = () => {
    if (validateInput()) {
      result = schemes.list
        .find((element) => element.name === 'Amortized Schedule')
        .generate(calculationData.loanAmount, calculationData.loanTerm, calc);
      bottomLine = utilities.sumBottomLine(result);
    }
  };
</script>

<style>
  .calculator {
    background-color: white;
  }

  .input-wrapper,
  .result-wrapper {
    border: 0.5px dotted #ff3e00;
  }

  .loan-information-recap {
    text-align: center;
  }

  .result {
    width: 100%;
    border-collapse: collapse;
  }
</style>

<section class="calculator">
  <div class="input-wrapper">
    {#if calc}
      <h2>Amortization Schedule for a {calc.name}</h2>
      <div class="loan-information-recap">
        <p>
          Your loan will have an annual interest of
          {calculationData.interest}%, with
          {calculationData.paymentsPerYear}
          annual payments.
        </p>
      </div>
      <form method="post">
        <label for="amount">Loan amount:</label>
        <input type="number" bind:value={calculationData.loanAmount} />
        <label for="term">Loan term (years):</label>
        <input type="number" bind:value={calculationData.loanTerm} /><br />
        <input
          type="submit"
          on:click|preventDefault={generateSchedule}
          value="Get amortization schedule" />
        {#if error}
          <p style="color: red; font-weight: bold;">{error}</p>
        {/if}
      </form>
    {/if}
  </div>
  <br />
  {#if result}
    <div class="result-wrapper">
      <h2>Schedule</h2>
      <table class="result">
        <tr>
          <th>Due Date:</th>
          <th>Interest:</th>
          <th>Principal:</th>
          <th>Balance:</th>
        </tr>
        {#each result as row, i}
          <tr>
            <td>{utilities.monthNumberToDate(i, firstDueDate)}</td>
            <td>
              ${row.interest.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </td>
            <td>
              ${row.principal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </td>
            <td>
              ${row.outstanding.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </td>
          </tr>
        {/each}
        <tr style="background-color: #339933">
          <td style="font-weight: bold">TOTAL:</td>
          <td>
            ${bottomLine.interest.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </td>
          <td>
            ${bottomLine.principal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </td>
          <td style="font-weight: bold">
            ${(bottomLine.interest + bottomLine.principal).toLocaleString(
              undefined,
              { minimumFractionDigits: 2 }
            )}
          </td>
        </tr>
      </table>
    </div>
  {/if}
</section>
