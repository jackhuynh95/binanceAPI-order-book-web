<script setup lang="ts">
const { modelValue } = defineModels<{
  modelValue: string
}>()
</script>

<template>
  <form class="mx-auto max-w-md">
    <label for="default-search" class="sr-only mb-2 text-sm text-gray-900 font-medium dark:text-white">Search</label>
    <div class="relative">
      <div class="pointer-events-none absolute start-0 inset-y-0 flex items-center ps-3">
        <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        v-bind="$attrs"
        id="default-search" v-model="modelValue" type="search" class="block w-full border border-gray-300 rounded-lg bg-gray-50 p-4 ps-10 text-sm text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-700 dark:text-white focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400" placeholder="Search Mockups, Logos..." required
      >
      <button type="submit" class="absolute end-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm text-white font-medium dark:bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Search
      </button>
    </div>
  </form>
</template>
