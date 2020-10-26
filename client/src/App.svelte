<script>
  import LoanList from './components/LoanList.svelte';
  import AmortizedScheduleCalculator from './components/AmortizedScheduleCalculator.svelte';
  import * as schemes from './schemes/schemes';
  import { onMount } from 'svelte';

  let chosenSchemeName = 0;
  let chosenLoanId;
  let chosenCalculator = false;
  let schemeList = [];

  onMount(() => {
    schemeList = schemes.list.map((elem) => elem.name);
  });

  const setLoanId = (e) => {
    chosenLoanId = e.detail.id;
    toggleCalculator();
  };

  const toggleCalculator = () => {
    chosenCalculator = !chosenCalculator;
  };
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  {#if chosenSchemeName}
    <h1>WNDA Amortization Schedule Calculator</h1>
    <p>Please select desired loan type from the list below.</p>
    <LoanList on:click={setLoanId} />
    <br />
    {#if chosenCalculator}
      {#if chosenSchemeName == 'Amortized Schedule'}
        <AmortizedScheduleCalculator bind:loanType={chosenLoanId} />
      {/if}
    {/if}
  {:else}
    <h1>WNDA Calculators</h1>
    <p>Please select the payment scheme to calculate.</p>
    <select bind:value={chosenSchemeName} on:formchange={toggleCalculator}>
      {#each schemeList as scheme}
        <option value="" />
        <option value={scheme}>{scheme}</option>
      {/each}
    </select>
  {/if}
</main>
