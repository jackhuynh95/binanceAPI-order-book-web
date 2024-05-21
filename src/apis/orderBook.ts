import { useGet } from './axios'

export function getAllPairs() {
  return useGet({
    url: '/pairs',
  })
}

export function getPair(pair: Ref<string>) {
  const { execute: executeInternal, ...rest } = useGet()
  return { ...rest, execute: () => executeInternal(`/pairs/${pair.value}`) }
}
