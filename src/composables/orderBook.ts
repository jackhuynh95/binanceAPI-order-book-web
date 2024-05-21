import { getAllPairs, getPair } from '~/apis/orderBook'

export function useOrderBook() {
  const searchingPair = ref<string>()
  const selectedPair = ref<string>()

  const { execute: executePairList, data: dataPairList, isFinished: isFinishedPairList } = getAllPairs()
  const { execute: executePairDetail, data: dataPairDetail } = getPair(selectedPair as any)

  const pairs = computed<string>(() => dataPairList.value.result)
  const prices = computed(() => dataPairDetail.value?.result)

  onMounted(executePairList)
  until(isFinishedPairList).toBeTruthy().then(() => {
    selectedPair.value = pairs.value?.[0]
  })

  watch(selectedPair, executePairDetail)

  return {
    searchingPair,
    selectedPair,
    pairs,
    prices,
    pricesWithBid: computed(() => prices.value && JSON.parse(prices.value?.bids)),
    pricesWithAsk: computed(() => prices.value && JSON.parse(prices.value?.asks)),
  }
}
