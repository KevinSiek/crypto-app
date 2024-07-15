import httpApi from '@/utils/http-api'

const getAllCrypto = async () => {
  return httpApi.getDataViaApi('/backend/list-crypto')
}

const getMetricsCrypto = () => {
  return httpApi.getDataViaApi('/backend/metrics-crypto')
}

const getCoinInfo = (params) => {
  return httpApi.getDataViaApi('/backend/coin-info', params)
}

export default {
	getAllCrypto,
  getMetricsCrypto,
  getCoinInfo
}