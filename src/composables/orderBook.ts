import { getAllPairs, getPair } from '~/apis/orderBook'

export function useOrderBook() {
  const searchingPair = ref<string>()
  const selectedPair = ref<string>()

  const { execute: executePairList, data: dataPairList, isFinished: isFinishedPairList } = getAllPairs()
  const { execute: executePairDetail, data: dataPairDetail } = getPair(selectedPair as any)

  const pairs = computed<string[]>(() => dataPairList.value?.result)
  const pairsWithFiltered = computed<string[]>(() => searchingPair.value ? pairs.value?.filter(pair => pair.includes(searchingPair.value || '')) : pairs.value)
  const prices = computed(() => dataPairDetail.value?.result)

  until(isFinishedPairList).toBeTruthy().then(() => {
    selectedPair.value = pairs.value?.[0]
  })

  watch(selectedPair, executePairDetail)
  const { pause, resume, isActive } = useIntervalFn(executePairDetail, 1000)

  onMounted(() => {
    executePairList()
    !isActive.value && resume()
  })

  onBeforeUnmount(() => {
    isActive.value && pause()
  })

  return {
    searchingPair,
    selectedPair,
    pairs: pairsWithFiltered,
    prices,
    pricesWithBid: computed(() => prices.value && JSON.parse(prices.value?.bids)),
    pricesWithAsk: computed(() => prices.value && JSON.parse(prices.value?.asks)),
  }
}
