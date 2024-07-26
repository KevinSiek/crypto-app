<template>
  <main>
    <div class="content">
      <div class="upper">
        <div class="status">
          <label class="label-status">Status</label>
          {{ market.status }}
        </div>
        <div class="information">
          <h5>Information</h5>
          {{ market.information || '' }}
        </div>
        <div class="rules">
          <h5>Rules</h5>
          {{ market.rules || '' }}
        </div>
        <div class="condition">
          <h5>Condition</h5>
          <h4 class="now">{{ metricStore.condition() }}</h4>
          <!-- <h5>Details:</h5> -->
          <div class="btcPrice"> BTC: {{ btcMetrics.change }}</div>
          <div class="btcDom">BTC DOM: {{ bitcoinDom.change }}</div>
          <div class="altDom">Altcoin DOM: {{ altcoinDom.change }}</div>
          <div class="latestUpdated pt-2">Latest Updated: {{ latestUpdatedTime }} <br> (Updated min 5 minutes)</div>
        </div>
        <div class="latest-update">
          Latest Updated: <br>
          {{ market.timestamp.toDate().toLocaleString() }}
        </div>
      </div>
      <div class="watchlist">
        <h3>Watchlist</h3>
        <div class="tableWatchlist tableScroll">
          <WatchlistTable :type="'show'"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useMarketStore } from '@/stores/market'
import { useMetricStore } from '@/stores/metric'
import WatchlistTable from '@/components/WatchlistTable.vue'
import { storeToRefs } from 'pinia'
import { Timestamp } from 'firebase/firestore'


const marketStore = useMarketStore()
const metricStore = useMetricStore()

const { market } = storeToRefs(marketStore)

const { bitcoinDom, altcoinDom, btcMetrics } = storeToRefs(metricStore)

marketStore.getMarket()
metricStore.getData()

const latestUpdatedTime = computed(() => {
  return btcMetrics.value.timestamp ? btcMetrics.value.timestamp.toDate().toLocaleString() : ''
})

</script>

<style lang="scss" scoped>
.content {
  .upper {
    padding: 7px;
  }
  .status {
    padding: 20px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: solid 1px black;  
    border-radius: 10px;
    .label-status {
      font-size: 20px;
    }
  }
  .information, .condition {
    min-height: 12vh;
    background-color: rgb(0, 0, 0);
    padding: 20px;
    border-radius: 10px;
    color: white;
  }
  .rules {
    padding: 20px;
    border: solid 1px black;  
    border-radius: 10px;
  }
  .information, .condition, .watchlist, .rules, .latest-update {
    margin: 20px 0 0 0;  
  }
  .latest-update {
    text-align: center;
  }
  .watchlist {
    padding: 10px;
    .tableWatchlist {
      height: 40vh;
      border: 2px solid black;
      border-radius: 10px;
      overflow: auto;
    }
  }
}

@media (min-width: 1024px) {
  .tableScroll::-webkit-scrollbar {
    width: 10px;
  }
  .tableScroll::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgb(199, 199, 199); 
    border-radius: 10px;
  }
  .tableScroll::-webkit-scrollbar-thumb {
    background: rgb(196, 196, 196); 
    border-radius: 10px;
  }
  .tableScroll::-webkit-scrollbar-thumb:hover {
    background: #696969; 
  }
}


</style>
