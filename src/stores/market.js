import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { onSnapshot, doc, updateDoc } from "firebase/firestore"

export const useMarketStore = defineStore('market', () => {

  const market = reactive({
    status: '',
    information: ''
  })

  const marketCollectionRef = doc(db, 'market', 'data')

  function getMarket () {
    onSnapshot(marketCollectionRef, (doc) => {
      market.status = doc.data().status
      market.information = doc.data().information
    })
  }

  function editMarket () {
    updateDoc(marketCollectionRef, market)
  }

  return { market, getMarket, editMarket }
})
