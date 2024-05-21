import { promiseTimeout } from '@vueuse/core'
import { useSocket } from '~/apis/socketIO'
import { getAllPairs, getPair } from '~/apis/orderBook'

export function useOrderBook() {
  const searchingPair = ref<string>()
  const selectedPair = ref<string>()
  const extraPair = ref({ volume: 0, price_change: 0 })

  const { execute: executePairList, data: dataPairList, isFinished: isFinishedPairList } = getAllPairs()
  const { execute: executePairDetail, data: dataPairDetail } = getPair(selectedPair as any)

  const pairs = computed<string[]>(() => dataPairList.value?.result)
  const pairsWithFiltered = computed<string[]>(() => searchingPair.value ? pairs.value?.filter(pair => pair.includes(searchingPair.value || '')) : pairs.value)
  const prices = computed(() => dataPairDetail.value?.result)

  until(isFinishedPairList).toBeTruthy().then(() => {
    selectedPair.value = pairs.value?.[0]
  })

  watch(selectedPair, () => {
    executePairDetail()

    // delay 500 milliseconds for connection in very first time
    promiseTimeout(500).then(() => {
      useSocket().sendMessage('pair-token', selectedPair.value)
    })
  })
  // [Deprecated] Internal Refetch per 1 second
  // const { pause, resume, isActive } = useIntervalFn(executePairDetail, 1000)

  onMounted(() => {
    executePairList()
    // !isActive.value && resume()

    useSocket().on('pair-info', (response) => {
      dataPairDetail.value = response
    })

    useSocket().on('pair-extra', (response) => {
      extraPair.value = response.result
    })
  })

  onBeforeUnmount(() => {
    // isActive.value && pause()
  })

  return {
    searchingPair,
    selectedPair,
    selectedPairWithPriceChange: computed(() => extraPair.value?.price_change),
    selectedPairWithVolume: computed(() => extraPair.value?.volume),
    extraPair,
    pairs: pairsWithFiltered,
    prices,
    pricesWithBid: computed(() => prices.value && JSON.parse(prices.value?.bids)),
    pricesWithAsk: computed(() => prices.value && JSON.parse(prices.value?.asks)),
  }
}
