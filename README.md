# Currency exchange widget

## Review locally:

### Run dev server: 

#### Install packages: 
`yarn install && yarn install:client`

#### Run iframe and react-app: 
`yarn run-widget`

Widget loaded in iframe is available on:
*  http://127.0.0.1:8080

React app is available in port 3000: 
* http://localhost:3000/

### Tests:
`yarn test:client`

## Technical and architectural decisions: 

* Autonomous data fetching;
* Encapsulated calculation logic running in background workers;
* Completely separated UI from data handling;
* Automatic retries (disabled due to limited API availability on lines [here ](widget/src/store/modules/currency-rates/sagas.ts#L44) and [here ](widget/src/store/modules/currency-rates/sagas.ts#L45));
* Concurrent request handling using redux-sagas;
* Debouncing agains multiple rate requests to the API;
* Direct exchange transfers with a possibility to integrate API. Disabling of user actions' implemented;
* Input formatting and on-app format handling;
* React.js, redux, redux-saga middleware and typescript stack;
* Snapshot, integration and unit tests;

## Functionality: 

* 10 second rate refresh;
* Three pockets' storages: GBP, USD, EUR;
* Unavailability state ( [comment line here ](widget/src/api/currency-rates/index.ts#L9) to enable );
* Pocket 'flip' - replace pockets vertically;
* Currency rate view change: press the currency rate chip in the center of widget;
* Reverse rate calculation;
* Actions disabled if network idle or action is submitted;
* Out balance highlight;
* If currencies are flipped, Out placed sum is checked against the pocket balance;
* 2 digit placed sum float and up to 4 digit currency rate display;

## API integration notes: 

Used source: https://openexchangerates.org.

### ⚠️ Things to note: 
* Rates provided by API are only USD based.
* 1000 calls/month limit per free API subscription. Save the dev environment 🌱[commenting out this line](widget/src/api/currency-rates/index.ts#L9).

# Screenshots:

* Network error state;
* Idle state;
* Additional features' state;

<img width="400" height="500" src="readme-assets/fetch_failure.png">  
<img width="400" height="500" src="readme-assets/idle_state.png">   
<img width="400" height="500" src="readme-assets/additional_features.png"> 
