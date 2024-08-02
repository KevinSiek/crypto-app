<template>
  <div class="content table-responsive tableScroll">
    <table v-if="activeWatchlist.length == 0" class="table"> 
      <tbody class="body">
        No Watchlist... Wait and See	
      </tbody>
    </table>
    <table v-else class="table table-hover table-bordered table-striped">
      <thead>
        <tr class="align-middle">
          <th scope="col" class="table-col table-number">No</th>
          <th scope="col" colspan="2" class="table-col table-name">Coin</th>
          <th scope="col" colspan="4" class="table-col table-status">Status</th>
          <th scope="col" colspan="4" class="table-col table-price">Entry Price</th>
          <th scope="col" colspan="2" class="table-col table-notes">Notes</th>
          <th v-if="props.type === 'edit'" 
            scope="col" colspan="2" class="table-col table-option"
          >
            Option
          </th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr 
          class="align-middle"
          v-for="(watchlist, index) in activeWatchlist"
          :key="index"
        >
          <th scope="row" class="table-col table-number">{{ index+1 }}</th>
          <td colspan="2" class="table-col table-name">{{ watchlist.coin }}</td>
          <td colspan="4" class="table-col table-status">{{ watchlist.status }}</td>
          <td colspan="4" class="table-col table-price">{{ watchlist.entry_price }}</td> 
          <td colspan="2" class="table-col table-notes">{{ watchlist.notes }}</td>
          <td 
            v-if="props.type === 'edit'" 
            colspan="4" class="table-col table-option"
          >
            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editWatchlistModal" @click="handleEditClick(watchlist)">Edit</button>
            <button type="button" class="btn btn-danger" @click="handleDeleteClick(watchlist)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useWatchlistStore } from '@/stores/watchlist'
import { storeToRefs } from 'pinia'
import { onMounted, computed } from 'vue'

const props = defineProps(['type'])

const watchlistStore = useWatchlistStore()

const { watchlists } = storeToRefs(watchlistStore)

const activeWatchlist = computed(() => {
  return props.type == 'edit' ? watchlists.value : watchlists.value.filter(item => item.active)
})

onMounted(() => {
  const watchlistStore = useWatchlistStore()
  watchlistStore.getWatchlists()
})

function handleEditClick (watchlist) {
  watchlistStore.setWatchlist(watchlist)
}

function handleDeleteClick (watchlist) {
  watchlistStore.deleteWatchlist(watchlist)
}

</script>

<style lang="scss" scoped>
.table-col{
  text-align: center;
}
.table-number{
  min-width: 3vw;
}
.table-name{
  min-width: 12vw;
}
.table-status{
  min-width: 15vw;
}
.table-price{
  min-width: 15vw;
}
.table-notes{
  min-width: 40vw;
}
.table-option{
  display: flex;
  justify-content: space-evenly;
  min-width: 20vw;
}
.body{
  font-size: 1.7vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  background-color: white;
}

</style>