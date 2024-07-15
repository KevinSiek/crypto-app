import axios from 'axios'

const getDataViaApi = async (path, params, cb) => {
  return axios.get(path, {
    params
  })
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err.response)
    })
}

const postDataViaApi = async (path, data, cb) => {
	return axios.post(path, data)
		.then((res) => res.data.data)
    .catch((err) => {
			console.log(err.response)
		})
}

const getDataByIdViaApi = async (path, cb) => {
	return axios.get(path)
		.then((res) => res.data.data)
    .catch((err) => {
			console.log(err.response)
		})
}

const putDataViaApi = async (path, data, cb) => {
	return axios.put(path, data)
		.then((res) => res.data.data)
    .catch((err) => {
			console.log(err.response)
		})
}

const deleteDataViaApi = async (path, cb) => {
	return axios.delete(path)
		.then((res) => res.data.data)
    .catch((err) => {
			console.log(err.response)
		})
}

export default {
  getDataViaApi,
  postDataViaApi,
  getDataByIdViaApi,
  putDataViaApi,
  deleteDataViaApi
}