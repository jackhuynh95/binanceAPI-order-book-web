import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL || window.location.origin,
  // withCredentials: true,
})

instance.interceptors.request.use((config) => {
  // if (config && config.url) {
  //   config.headers['X-Requested-With'] = 'XMLHttpRequest'
  // }

  return config
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // if (error.response) {
    //   console.log(error.response.status.toString(), error)
    // }
    return Promise.reject(error)
  },
)

export default instance

export function useGet({
  url = '',
  params = {},
  headers = {},
} = {}) {
  const fullHeaders: any = { ...headers }

  const usedAxios = useAxios(
    url,
    { method: 'GET', params, headers: fullHeaders },
    instance,
    {
      immediate: false,
    },
  )

  return usedAxios
}

export function usePost({
  url = '',
  data = {},
  headers = {},
} = {}) {
  const fullHeaders: any = { ...headers }

  const usedAxios = useAxios(
    url,
    { method: 'POST', data, headers: fullHeaders },
    instance,
    {
      immediate: false,
    },
  )

  return usedAxios
}

export function usePut({
  url = '',
  data = {},
  headers = {},
} = {}) {
  const fullHeaders: any = { ...headers }

  const usedAxios = useAxios(
    url,
    { method: 'PUT', data, headers: fullHeaders },
    instance,
    {
      immediate: false,
    },
  )

  return usedAxios
}
