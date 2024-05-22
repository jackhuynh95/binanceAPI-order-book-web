<script lang="ts" setup>
const usedOrderBook = useOrderBook()
const { selectedPair, searchingPair, selectedPairWithHighPrice, selectedPairWithLowPrice, selectedPairWithPriceChange, selectedPairWithVolume } = usedOrderBook

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
          <div>{{ selectedPairWithPriceChange }}</div>
        </div>
        <div>
          <div>24h High</div>
          <div>{{ selectedPairWithHighPrice }}</div>
        </div>
        <div>
          <div>24h Low</div>
          <div>
            {{ selectedPairWithLowPrice }}
          </div>
        </div>
        <div>
          <div>24h Volume</div>
          <div>
            {{ selectedPairWithVolume }}
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 mx-auto w-3/4 content-end">
      <div class="space-y-5">
        <TheBidPrices />
        <TheAskPrices />
      </div>
      <div class="self-end">
        <TheChart />
      </div>
    </div>
  </div>
</template>
