import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

import store from 'store';
import { actions as pocketsActions } from 'store/modules/pockets';
import { actions as currencyRatesActions } from 'store/modules/currency-rates';
import ExchangeButton from 'components/exchange-button';

const component = (
    <Provider store={store}>
        <ExchangeButton />
    </Provider>
);

let wrapper;
let button;

describe('Exchange button', () => {
    const load = () => {
        wrapper = mount(component);
        button = wrapper.find('button');
    };

    beforeAll(() =>  load());

    it('is rendered', () => {
        expect(button.exists()).toBeTruthy();
    });

    it('is disabled on init state', () => {
        expect(button.prop('disabled')).toBeTruthy();
    });

    it('is enabled if rates are present', () => {
        store.dispatch(currencyRatesActions.setCurrencyRates({ rate: 1.22, reverse: 0.88 }));
        load();
        expect(button.prop('disabled')).toBeFalsy();
    });

    it('is disabled exchange submitted', () => {
        store.dispatch(pocketsActions.placeExchangeRequest());
        load();
        expect(button.prop('disabled')).toBeTruthy();
    });

    it('is enabled again after exchange submitted', () => {
        store.dispatch(pocketsActions.placeExchangeSuccess());
        load();
        expect(button.prop('disabled')).toBeFalsy();
    });

    it('is disabled when loading rates', () => {
        store.dispatch(currencyRatesActions.getCurrencyRates());
        load();
        expect(button.prop('disabled')).toBeTruthy();
    });

    it('is enabled again after loading rates', () => {
        store.dispatch(currencyRatesActions.getCurrencyRatesSuccess());
        load();
        expect(button.prop('disabled')).toBeFalsy();
    });

});

describe('ExchangeButton snapshots', () => {
    const render = () => renderer.create(component).toJSON();

    it('renders enabled', () => {
        expect(render()).toMatchSnapshot();
    });

    it('renders disabled after store change', () => {
        act(() => {
            store.dispatch(currencyRatesActions.getCurrencyRates());
        });
        expect(render()).toMatchSnapshot();
    });
});