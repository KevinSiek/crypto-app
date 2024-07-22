import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { db } from '@/firebase'
import { doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore"
import coinMarketCapApi from '@/api/coinmarketcap'

export const useMetricStore = defineStore('metric', () => {
  const bitcoinDom = reactive({
    previous: 0,
    current: 0,
    change: 0,
    timestamp: ''
  })

  const altcoinDom = reactive({
    previous: 0,
    current: 0,
    change: 0,
    timestamp: ''
  })

  const ethDom = reactive({
    previous: 0,
    current: 0,
    change: 0,
    timestamp: ''
  })

  const btcMetrics = reactive({
    previous: 0,
    current: 0,
    change: 0,
    timestamp: ''
  }) 

  const metrics = ref({})
  const btc_price = ref(0)

  const bitcoinDomCollectionRef = doc(db, 'metrics', 'bitcoin_dom')
  const altcoinDomCollectionRef = doc(db, 'metrics', 'altcoin_dom')
  const ethDomCollectionRef = doc(db, 'metrics', 'eth_dom')
  const btcPriceCollectionRef = doc(db, 'metrics', 'btc_price')

  async function getCoinMarketCapData () {
    const metricsCrypto = await coinMarketCapApi.getMetricsCrypto()
    metrics.value = metricsCrypto
    const btc = await coinMarketCapApi.getCoinInfo({
      id: '1'
    })
    btc_price.value = btc[1].quote.USD.price
  }

  async function getDatabase () {
    getDoc(bitcoinDomCollectionRef).then((doc) => {
      bitcoinDom.previous = doc.data().previous
      bitcoinDom.current = doc.data().current
      bitcoinDom.change = doc.data().change
      bitcoinDom.timestamp = doc.data().timestamp

      calculateBitcoinData()
    })
    getDoc(altcoinDomCollectionRef).then((doc) => {
      altcoinDom.previous = doc.data().previous
      altcoinDom.current = doc.data().current
      altcoinDom.change = doc.data().change
      altcoinDom.timestamp = doc.data().timestamp

      calculateAltcoinData()
    })
    getDoc(ethDomCollectionRef).then((doc) => {
      ethDom.previous = doc.data().previous
      ethDom.current = doc.data().current
      ethDom.change = doc.data().change
      ethDom.timestamp = doc.data().timestamp

      calculateEthData()
    })
    getDoc(btcPriceCollectionRef).then((doc) => {
      btcMetrics.previous = doc.data().previous
      btcMetrics.current = doc.data().current
      btcMetrics.change = doc.data().change
      btcMetrics.timestamp = doc.data().timestamp

      calculateBitcoinPriceData()
    })
    // onSnapshot(bitcoinDomCollectionRef, (doc) => {
    //   bitcoinDom.previous = doc.data().previous
    //   bitcoinDom.current = doc.data().current
    //   bitcoinDom.change = doc.data().change
    //   bitcoinDom.timestamp = doc.data().timestamp
    //   console.log('data', bitcoinDom)
    // })
    // onSnapshot(altcoinDomCollectionRef, (doc) => {
    //   altcoinDom.previous = doc.data().previous
    //   altcoinDom.current = doc.data().current
    //   altcoinDom.change = doc.data().change
    //   altcoinDom.timestamp = doc.data().timestamp
    // })
    // onSnapshot(ethDomCollectionRef, (doc) => {
    //   ethDom.previous = doc.data().previous
    //   ethDom.current = doc.data().current
    //   ethDom.change = doc.data().change
    //   ethDom.timestamp = doc.data().timestamp
    // })
    // onSnapshot(btcPriceCollectionRef, (doc) => {
    //   btcMetrics.previous = doc.data().previous
    //   btcMetrics.current = doc.data().current
    //   btcMetrics.change = doc.data().change
    //   btcMetrics.timestamp = doc.data().timestamp
    // })
  }

  async function getData () {
    await getCoinMarketCapData()
    await getDatabase()
  }

  function isTimePassed (prev) {
    return (Date.now() - prev)/1000/60 > 5
  }

  function calculateBitcoinData () {
    const btcDom = metrics.value.btc_dominance
    const change = (btcDom - bitcoinDom.current) / btcDom * 100
    if((change === 0 || !isTimePassed(bitcoinDom?.timestamp?.toDate()))) return 

    bitcoinDom.change = change
    bitcoinDom.previous = bitcoinDom.current
    bitcoinDom.current = btcDom
    bitcoinDom.timestamp = serverTimestamp()
    updateDoc(doc(db, 'metrics', 'bitcoin_dom'), bitcoinDom)
    console.log('BTC Dom Updated')
  }

  function calculateAltcoinData () {
    const altDom = metrics.value.quote.USD.altcoin_market_cap
    const change = (altDom - altcoinDom.current) / altDom * 100
    if(change === 0 || !isTimePassed(altcoinDom?.timestamp?.toDate())) return 
    
    altcoinDom.change = change
    altcoinDom.previous = altcoinDom.current
    altcoinDom.current = altDom
    altcoinDom.timestamp = serverTimestamp()
    updateDoc(doc(db, 'metrics', 'altcoin_dom'), altcoinDom)
    console.log('Altcoin Dom Updated')
  }

  function calculateEthData () {
    const eth = metrics.value.eth_dominance
    const change = (eth - ethDom.current) / eth * 100
    if(change === 0 || !isTimePassed(ethDom?.timestamp?.toDate())) return 

    ethDom.change = change
    ethDom.previous = ethDom.current
    ethDom.current = eth
    ethDom.timestamp = serverTimestamp()
    updateDoc(doc(db, 'metrics', 'eth_dom'), ethDom)
    console.log('ETH Dom Updated')
  }

  async function calculateBitcoinPriceData () {
    const btcPrice = btc_price.value
    const change = (btcPrice - btcMetrics.current) / btcPrice * 100
    if(change === 0 || !isTimePassed(btcMetrics?.timestamp?.toDate())) return 

    btcMetrics.change = change
    btcMetrics.previous = btcMetrics.current
    btcMetrics.current = btcPrice
    btcMetrics.timestamp = serverTimestamp()
    updateDoc(doc(db, 'metrics', 'btc_price'), btcMetrics)
    console.log('BTC Updated')
  }

  function condition () {
    if(btcMetrics.change > 0) {
      if (bitcoinDom.change > 0) {
        if (altcoinDom.change > 0) {
          return 'All Crypto Pump'
        }
        if(altcoinDom.change <= 0) {
          return 'Altcoin Dump'
        }
      }
      if(bitcoinDom.change < 0) {
        if(altcoinDom.change > 0) {
          return 'Altcoin Pump'
        }
      }
    }
    if(btcMetrics.change < 0) {
      if(bitcoinDom.change > 0) {
        if(altcoinDom.change < 0) {
          return 'Altcoin Dump'
        }
      } 
      if(bitcoinDom.change < 0) {
        if(altcoinDom.change > 0) {
          return 'Altcoin Pump'
        }
        if(altcoinDom.change < 0) {
          return 'All Crypto Dump'
        }
      }
    }
    return 'Wait'
  }

  return { bitcoinDom, altcoinDom, ethDom, btcMetrics, getData, condition }
})
