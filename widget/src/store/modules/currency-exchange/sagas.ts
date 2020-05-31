import { 
  all, 
  // take, 
  // put, 
  // call, 
  // delay 
} from 'redux-saga/effects';

// import { getCurrencyRates } from '../../../api/currency-rates';

// import { actions } from '.';

// export function* startPollingCurrencyRatesFlow() {
//   while (true) {
//     yield take(actions.startPollingCurrencyRates);
//     // set polling true

//     yield put(actions.getCurrencyRatesRequest());

//     while (true) {
//       // TODO retrieve selected currencies and polling status
//       yield delay(10000);
//       const response = yield call(getCurrencyRates);
//       console.log(response)
//     // if (!error) {
//     //   yield put(actions.setCurrencyRates({
//     //     payload: response// TODO get exact format,
//     //   }));
//     // }
//       // break if polling is stopped
//     }

//   }
// }

// TODO add watcher

export default function* saga() {
  yield all([
    // startPollingCurrencyRatesFlow(),
  ]);
}
