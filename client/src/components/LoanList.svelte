<script>
  import { onMount, createEventDispatcher } from 'svelte';

  let loanTypeList = [];

  const dispatch = createEventDispatcher();

  onMount(async () => {
    const res = await fetch('loan-types.json');
    loanTypeList = await res.json();
  });

  const tableClick = (event) => {
    dispatch('click', { id: event.currentTarget.id });
  };
</script>

<style>
  .loanlist {
    width: 100%;
    border: 0.5px dotted #ff3e00;
    border-collapse: collapse;
  }

  .loanlist tr:not(:first-child):hover {
    background-color: #ff3e00;
  }
</style>

<section>
  <table class="loanlist">
    <tr>
      <th>Loan Name</th>
      <th>Annual interest rate</th>
      <th>Payments per year</th>
    </tr>
    {#each loanTypeList as loanType}
      <tr on:click={tableClick} id={loanType.id}>
        <td>{loanType.name}</td>
        <td>{loanType.interest}%</td>
        <td>{loanType.paymentsPerYear}</td>
      </tr>
    {/each}
  </table>
</section>
