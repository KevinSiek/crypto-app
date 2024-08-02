import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore"

export const useWatchlistStore = defineStore('watchlist', () => {
  const watchlists = ref([])

  const watchlist = reactive({
    coin: '',
    status: '',
    entry_price: 0,
    notes: '',
    active: true
  })

  const watchlistsCollectionRef = collection(db, 'watchlists')

  function getWatchlists () {
    onSnapshot(watchlistsCollectionRef, (querySnapshot) => {
      let newWatchlist = []
      querySnapshot.forEach((doc) => {
        const watchlist = {
          id: doc.id,
          coin: doc.data().coin,
          entry_price: doc.data().entry_price,
          notes: doc.data().notes,
          status: doc.data().status,
          active: doc.data().active
        }
        newWatchlist.push(watchlist)
      })
      watchlists.value = newWatchlist
    })
  }

  function resetWatchlist () {
    watchlist.coin = ''
    watchlist.status = ''
    watchlist.entry_price = 0
    watchlist.notes = ''
    watchlist.active = true
  }

  async function addWatchlist () {
    await addDoc(watchlistsCollectionRef, watchlist)
    resetWatchlist()
  }

  function setWatchlist (newWatchlist) {
    watchlist.id = newWatchlist.id
    watchlist.coin = newWatchlist.coin
    watchlist.status = newWatchlist.status
    watchlist.entry_price = newWatchlist.entry_price
    watchlist.notes = newWatchlist.notes
    watchlist.active = newWatchlist.active
  }

  function editWatchlist () {
    updateDoc(doc(db, 'watchlists', watchlist.id), watchlist)
  }

  function deleteWatchlist (watchlist) {
    deleteDoc(doc(watchlistsCollectionRef, watchlist.id))
  }

  return { watchlists, watchlist, getWatchlists, addWatchlist, setWatchlist, editWatchlist, deleteWatchlist }
})
