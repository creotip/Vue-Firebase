<template>
  <div class="calculator container">
    <div class="page-header">
      <h1 style="text-align: center">
        Calculator Page
      </h1>
    </div>
    <div class="wrap-calc">
      <div class="amount-inputs-block">
        <input
          type="range"
          id="amount"
          value="90"
          max="1000000"
          v-model="amount">
        <p>
          {{ formatNumber }}
        </p>
      </div>
      <div class="years-inputs-block">
        <input
          type="range"
          id="years"
          value="90"
          max="30"
          v-model="years">
        <p>
          {{ years }}
        </p>
      </div>

      <div class="wrap-result">
        <h2>{{ result.toFixed().toLocaleString() }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'calculator',
    data () {
      return {
        amount: 0,
        years: 25,
        interest: 0
      }
    },
    computed: {
      formatNumber: function (w) {
        let formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
        })
        // console.log()
        return formatter.format(this.amount)
      },
      result: function () {
        let M // monthly mortgage payment
        let P = this.amount // principle / initial amount borrowed
        let I = 3.5 / 100 / 12 // monthly interest rate
        let N = this.years * 12 // number of payments months
        function monthlyPayment (p, n, i) {
          return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
        }
        // monthly mortgage payment
        M = monthlyPayment(P, N, I)

        console.log(M)
        return M
      }
    },
    mounted () {

    }
  }
</script>
<style>
  .calculator {
    max-width: 600px;
  }
</style>
