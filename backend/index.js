import express from 'express'
import serverless from "serverless-http"
import cors from 'cors'
import axios from 'axios'
import config from './config.js'

const PORT = 8080
const app = express()
app.use(cors())

const defaultOption = {
  headers: {
    'X-CMC_PRO_API_KEY': config.API_KEY
  }
}

const httpApi = (options, req, res) => {
  axios
    .request(options)
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      res.json(error);
    })
}

app.get('/backend/list-crypto', (req, res) => {
  const options = {
    ...defaultOption,
    method: 'GET',
    url: config.api.listCrypto, 
    params: {
      limit: 150
    }
  }

  httpApi(options, req, res)
})

app.get('/backend/metrics-crypto', (req, res) => {
  const options = {
    ...defaultOption,
    method: 'GET',
    url: config.api.metricsData
  }

  httpApi(options, req, res)
})

app.get('/backend/coin-info', (req, res) => {
  const options = {
    ...defaultOption,
    method: 'GET',
    url: config.api.coinInfo,
    params: {
      ...req.query
    }
  }

  httpApi(options, req, res)
})


export const handler = serverless(app);