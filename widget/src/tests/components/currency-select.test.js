import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

import store from 'store';
import { CurrencyExchangeTypes, CurrencyMap } from 'types';
import { actions } from 'store/modules/currency-rates';
import { defaultState } from 'store/modules/currencies/reducer';
import { actions as currencyActions } from 'store/modules/currencies';
import CurrencySelect from 'components/currency-select-field';

const component = (
    <Provider store={store}>
        <CurrencySelect pocketDirection={CurrencyExchangeTypes.out} />
        <CurrencySelect pocketDirection={CurrencyExchangeTypes.in} />
    </Provider>
);

let wrapper;
let firstInput, secondInput;

describe('Currency Select integration', () => {
    beforeAll(() => {
        store.dispatch(actions.setCurrencyRates({ rate: 1.22, reverse: 0.88 }));
        wrapper = mount(component);
        firstInput = wrapper.find('#choose-out-currency').first();
        secondInput = wrapper.find('#choose-in-currency').first();
    });

    it('both selects are rendered', () => {
        expect(firstInput.exists()).toBeTruthy();
        expect(secondInput.exists()).toBeTruthy();
    });

    it('currency-out select shows default currency', () => {
        expect(firstInput.props().value).toBe(defaultState[CurrencyExchangeTypes.out]);
        expect(secondInput.props().value).toBe(defaultState[CurrencyExchangeTypes.in]);
    });

    it('currency-out select change is visible after action', () => {
        store.dispatch(currencyActions.setSelectedCurrency({ [CurrencyExchangeTypes.out]: CurrencyMap.dollar }));
        wrapper = mount(component);
        firstInput = wrapper.find('#choose-out-currency').first();
        expect(firstInput.props().value).toBe(CurrencyMap.dollar);
    });

    it('currency-in select change is visible after action', () => {
        store.dispatch(currencyActions.setSelectedCurrency({ [CurrencyExchangeTypes.in]: CurrencyMap.euro }));
        wrapper = mount(component);
        secondInput = wrapper.find('#choose-in-currency').first();
        expect(secondInput.props().value).toBe(CurrencyMap.euro);
    });
});

describe('CurrencySelect snapshots', () => {
    it('renders selects', () => {
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders selects after store change', () => {
        act(() => {
            store.dispatch(currencyActions.setSelectedCurrency({ [CurrencyExchangeTypes.in]: CurrencyMap.pound }));
            store.dispatch(currencyActions.setSelectedCurrency({ [CurrencyExchangeTypes.out]: CurrencyMap.euro }));
        });

        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
});


export default component;