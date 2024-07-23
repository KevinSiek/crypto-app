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
        <div class="condition">
          <h5>Condition</h5>
          <h4 class="now">{{ metricStore.condition() }}</h4>
          <!-- <h5>Details:</h5> -->
          <div class="btcPrice"> BTC: {{ btcMetrics.change }}</div>
          <div class="btcDom">BTC DOM: {{ bitcoinDom.change }}</div>
          <div class="altDom">Altcoin DOM: {{ altcoinDom.change }}</div>
          <div class="latestUpdated pt-2">Latest Updated: {{ latestUpdatedTime }} (Updated min 5 minutes)</div>
        </div>
      </div>
      <div class="watchlist">
        <h3>Watchlist</h3>
        <div class="tableWatchlist">
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
  return btcMetrics.value.timestamp instanceof Timestamp ? btcMetrics.value.timestamp.toDate() : ''
})

</script>

<style lang="scss" scoped>
.content {
  .upper {
    padding: 7px;
  }
  .status {
    padding: 20px 0;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px black;  
    border-radius: 10px;
    min-height: 13vh;
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
  .information, .condition, .watchlist {
    margin: 20px 0 0 0;  
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

</style>
