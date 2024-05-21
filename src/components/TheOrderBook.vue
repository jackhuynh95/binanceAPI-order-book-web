<script lang="ts" setup>
const usedOrderBook = useOrderBook()
const { selectedPair, searchingPair } = usedOrderBook

provide('usedOrderBook', usedOrderBook)
</script>

<template>
  <div class="space-y-10">
    <div>
      <div class="inline-flex items-start space-x-10">
        <h1 class="pt-4 font-bold uppercase">
          {{ selectedPair }}
        </h1>
        <TheSearch v-model="searchingPair" class="w-[300px]" />
      </div>
    </div>
    <div>
      <div class="inline-flex space-x-10">
        <div>
          <div>24h Change</div>
          <div>...</div>
        </div>
        <div>
          <div>24h High</div>
          <div>...</div>
        </div>
        <div>
          <div>24h Low</div>
          <div>...</div>
        </div>
        <div>
          <div>24h Volume(BTC)</div>
          <div>...</div>
        </div>
        <div>
          <div>24h Volume(USDT)</div>
          <div>...</div>
        </div>
      </div>
    </div>
    <TheBidPrices class="mx-auto w-1/2" />
    <TheAskPrices class="mx-auto w-1/2" />
  </div>
</template>
