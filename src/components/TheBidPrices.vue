<script lang="ts" setup>
const { pricesWithBid } = inject('usedOrderBook') as ReturnType<typeof useOrderBook>
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
      <thead class="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Price(USDT)
          </th>
          <th scope="col" class="px-6 py-3">
            Amount(BTC)
          </th>
          <th scope="col" class="px-6 py-3">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(priceBid, idx) in pricesWithBid" :key="idx" class="border-b bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="whitespace-nowrap px-6 py-4 text-gray-900 font-medium dark:text-red">
            {{ priceBid[0] }}
          </th>
          <td class="px-6 py-4">
            {{ priceBid[1] }}
          </td>
          <td class="px-6 py-4">
            {{ priceBid[0] * priceBid[1] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
