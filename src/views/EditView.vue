<template>
  <div class="content">
    <div class="market mb-5">
      <div class="data">
        <form class="form">
          <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <input type="text" class="form-control" id="status" v-model="market.status">
          </div>
          <div class="mb-3">
            <label for="notes" class="form-label">Information</label>
            <input type="text" class="form-control" id="information" v-model="market.information">
          </div>
        </form>
        <div class="btn-edit-market">
          <button type="button" class="btn btn-dark" @click="handleEditClick(watchlist)">Edit</button>
        </div>
      </div>
    </div>
    <hr>
    <div class="watchlist mt-4">
      <div class="title">
        <h3>Watchlist</h3>
        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addWatchlistModal">Add</button>
      </div>
      <div class="tableWatchlist mt-3">
        <WatchlistTable :type="'edit'"/>
      </div>
    </div>
    <WatchlistModal :type="'add'" id="addWatchlistModal" aria-hidden="true" />
    <WatchlistModal :type="'edit'" id="editWatchlistModal" aria-hidden="true" />
  </div>
</template>

<script setup>
import WatchlistTable from '@/components/WatchlistTable.vue'
import WatchlistModal from '@/components/WatchlistModal.vue'
import { useMarketStore } from '@/stores/market'
import { storeToRefs } from 'pinia'

const marketStore = useMarketStore()

const { market } = storeToRefs(marketStore)

function handleEditClick () {
  marketStore.editMarket()
}

</script>

<style lang="scss" scoped>
.market {
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .data{
    width: 50vw;
  }
  .btn-edit-market{
    display: flex;
    justify-content: flex-end;
  }
}
.watchlist {
  margin-top: 3vw;
  padding: 10px;
  .title {
    display: flex;
    justify-content: space-between;
    padding: 0 4vw;
  }
  .tableWatchlist {
    height: 40vh;
    border: 2px solid black;
    border-radius: 10px;
    overflow: auto;
  }
}

</style>