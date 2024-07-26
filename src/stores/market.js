import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { onSnapshot, doc, updateDoc, Timestamp } from "firebase/firestore"

export const useMarketStore = defineStore('market', () => {

  const market = reactive({
    status: '',
    information: '',
    rules: '',
    timestamp: ''
  })

  const marketCollectionRef = doc(db, 'market', 'data')

  function getMarket () {
    onSnapshot(marketCollectionRef, (doc) => {
      market.status = doc.data().status
      market.information = doc.data().information
      market.rules = doc.data().rules
      market.timestamp = doc.data().timestamp
    })
  }

  function editMarket () {
    market.timestamp = Timestamp.now()
    updateDoc(marketCollectionRef, market)
  }

  return { market, getMarket, editMarket }
})
