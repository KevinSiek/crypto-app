
const v1Api = 'https://pro-api.coinmarketcap.com/v1'
const v2Api = 'https://pro-api.coinmarketcap.com/v2'

const config = {
  api: {
    listCrypto: `${v1Api}/cryptocurrency/listings/latest`,
    metricsData: `${v1Api}/global-metrics/quotes/latest`,
    coinInfo: `${v2Api}/cryptocurrency/quotes/latest`
  },
  API_KEY: '2fcc3835-95d4-4dab-8554-959978205c1e',
}

export default config