<script lang="ts" setup>
const { pricesWithAsk } = inject('usedOrderBook') as ReturnType<typeof useOrderBook>
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
      <thead class="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Price
          </th>
          <th scope="col" class="px-6 py-3">
            Amount
          </th>
          <th scope="col" class="px-6 py-3">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(priceAsk, idx) in pricesWithAsk" :key="idx" class="border-b bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="whitespace-nowrap px-6 py-4 text-gray-900 font-medium dark:text-green">
            {{ priceAsk[0] }}
          </th>
          <td class="px-6 py-4">
            {{ priceAsk[1] }}
          </td>
          <td class="px-6 py-4">
            {{ priceAsk[0] * priceAsk[1] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
