import axios from 'axios'

const URL = process.env.URL || 'https://my.api.rafaelpelle.tech'

export let axiosInstance = axios.create({
	baseURL: URL,
	timeout: 10000,
	headers: {'Access-Control-Allow-Origin': '*'},
})
