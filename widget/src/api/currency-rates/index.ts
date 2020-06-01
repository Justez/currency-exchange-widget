import axios from 'axios'

import { Currencies } from 'types';

const URL = 'https://reqres.in/api/users?page=2'
// TODO consume currencies
//@ts-ignore
export const getCurrencyRates = (obj: Currencies, checksum: string) => axios.get(URL+'&checksum='+checksum)
    .then(res => res.data)
    .catch(err => err)