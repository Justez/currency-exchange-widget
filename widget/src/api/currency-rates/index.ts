import axios from 'axios'

const URL = 'https://reqres.in/api/users?page=2'

export const getCurrencyRates = () => axios.get(URL)
    .then(res => res.data)
    .catch(err => err)