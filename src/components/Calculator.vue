<template>
  <div class="calculator container">
    <div class="page-header">
      <h1 style="text-align: center">
        Mortgage Calculator
      </h1>
    </div>
    <div class="wrap-calc">
      <div class="amount-inputs-block range-slider">
        <input
          class="range-slider__range"
          type="range"
          id="amount"
          value="90"
          max="1000000"
          v-model="amount">
        <span class="range-slider__value">Amount</span>
        <p>
          {{ formatNumber }}
        </p>
      </div>
      <div class="years-inputs-block range-slider">
        <input
          class="range-slider__range"
          type="range"
          id="years"
          value="90"
          max="30"
          v-model="years">
        <span class="range-slider__value">Years</span>
        <p>
          {{ years }}
        </p>
      </div>
      <div class="interest-inputs-block range-slider">
        <input
          class="range-slider__range"
          type="range"
          id="interest"
          value="3"
          step="0.005"
          max="10"
          v-model="interest">
        <span class="range-slider__value">Interest</span>
        <p>
          {{ interest }}%
        </p>
      </div>

      <div class="wrap-result">
        <h2>${{ parseFloat(result.toFixed()).toLocaleString() }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
  // import '../assets/calc.scss'
  export default {
    name: 'calculator',
    data () {
      return {
        amount: 100000,
        years: 25,
        interest: 3.5
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
        let I = this.interest / 100 / 12 // monthly interest rate
        let N = this.years * 12 // number of payments months
        function monthlyPayment (p, n, i) {
          return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
        }
        // monthly mortgage payment
        M = monthlyPayment(P, N, I)

        return M
      }
    },
    mounted () {

    }
  }
</script>
<style lang="scss">
  .calculator {
    max-width: 600px;
  }

  // Base Colors
  $shade-10: #2c3e50 !default;
  $shade-1: #d7dcdf !default;
  $shade-0: #fff !default;
  $teal: #1abc9c !default;

  .range-slider {
    margin: 30px 0 0 0%;
  }

  // Range Slider
  $range-width: 100% !default;

  $range-handle-color: $shade-10 !default;
  $range-handle-color-hover: $teal !default;
  $range-handle-size: 20px !default;

  $range-track-color: $shade-1 !default;
  $range-track-height: 10px !default;

  $range-label-color: $shade-10 !default;
  $range-label-width: 78px !default;

  .range-slider {
    width: $range-width;
    p {
      margin: 1rem 0;
      font-weight: bold;
    }
  }

  .range-slider__range {
    -webkit-appearance: none;
    width: calc(100% - (90px)) !important;
    height: 10px;
    border-radius: 5px;
    background: #d7dcdf;
    outline: none;
    padding: 0;
    margin: 0;
    display: inline-block !important;

    // Range Handle
    &::-webkit-slider-thumb {
      appearance: none;
      width: $range-handle-size;
      height: $range-handle-size;
      border-radius: 50%;
      background: $range-handle-color !important;
      cursor: pointer;
      transition: background .15s ease-in-out;

      &:hover {
        background: $range-handle-color-hover !important;
      }
    }

    &:active::-webkit-slider-thumb {
      background: $range-handle-color-hover;
    }

    &::-moz-range-thumb {
      width: $range-handle-size;
      height: $range-handle-size;
      border: 0;
      border-radius: 50%;
      background: $range-handle-color !important;
      cursor: pointer;
      transition: background .15s ease-in-out;

      &:hover {
        background: $range-handle-color-hover;
      }
    }

    &:active::-moz-range-thumb {
      background: $range-handle-color-hover;
    }
  }

  // Range Label
  .range-slider__value {
    display: inline-block;
    position: relative;
    width: $range-label-width;
    color: $shade-0;
    line-height: 20px;
    text-align: center;
    border-radius: 3px;
    background: $range-label-color;
    padding: 5px 10px;
    margin-left: 8px;

    &:after {
      position: absolute;
      top: 8px;
      left: -7px;
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-right: 7px solid $range-label-color;
      border-bottom: 7px solid transparent;
      content: '';
    }
  }

  // Firefox Overrides
  ::-moz-range-track {
    background: $range-track-color;
    border: 0;
  }

  input::-moz-focus-inner,
  input::-moz-focus-outer {
    border: 0;
  }

  // results
  .wrap-result {
    h2 {
      text-align: center;
    }
  }

</style>
