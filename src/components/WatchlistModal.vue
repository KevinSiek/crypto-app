<template>
  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ type }} Watchlist</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="form">
            <div class="mb-3">
              <label for="coin" class="form-label">Coin</label>
              <input type="text" class="form-control" id="coin" v-model="watchlist.coin">
            </div>
            <div class="mb-3">
              <label for="status" class="form-label">Status</label>
              <input type="text" class="form-control" id="status" v-model="watchlist.status">
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Entry Price</label>
              <input type="text" class="form-control" id="price" v-model="watchlist.entry_price">
            </div>
            <div class="mb-3">
              <label for="notes" class="form-label">Notes</label>
              <input type="text" class="form-control" id="notes" v-model="watchlist.notes">
            </div>
          </form>
          <div class="modal-footer">
            <button type="submit" class="btn btn-dark" data-bs-dismiss="modal" @click="handleOnClick()">{{ type }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWatchlistStore } from '@/stores/watchlist'
import { storeToRefs } from 'pinia'

const watchlistStore = useWatchlistStore()

const props = defineProps(['type'])

const type = props.type === 'edit' ? 'Edit' : 'Add'

const { watchlist } = storeToRefs(watchlistStore)

function handleOnClick () {
  if(type === 'Add') watchlistStore.addWatchlist()
  else watchlistStore.editWatchlist()
}
</script>

<style>

</style>