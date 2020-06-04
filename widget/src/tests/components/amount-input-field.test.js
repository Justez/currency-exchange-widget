import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

import store from 'store';
import AmountInputField from 'components/amount-input-field';
import { actions } from 'store/modules/currency-rates';
import { actions as pocketActions } from 'store/modules/pockets';

import { CurrencyExchangeTypes } from 'types';

const component = (
    <Provider store={store}>
        <AmountInputField pocketDirection={CurrencyExchangeTypes.out} />
        <AmountInputField pocketDirection={CurrencyExchangeTypes.in} />
    </Provider>
)

let wrapper;
let firstInput, secondInput;

describe('AmountInputField input integration', () => {
    beforeAll(() => {
        store.dispatch(actions.setCurrencyRates({ rate: 1.22, reverse: 0.88 }));
        wrapper = mount(component);
        firstInput = wrapper.find('input').first();
        secondInput = wrapper.find('input').at(1);
    });

    it('input is calculated properly', () => {
        expect(firstInput.props().value).toBe(4);
    });

    it('withdraw sum is calculated properly', () => {
        expect(secondInput.props().value).toBe(4.88);
    });

    it('withdraw sum changed after input is editted', () => {
        store.dispatch(pocketActions.placeSum({ placedSum: 6, pocketDirection: CurrencyExchangeTypes.out }));
        store.dispatch(pocketActions.placeSum({ placedSum: 6, pocketDirection: CurrencyExchangeTypes.out }));
        wrapper = mount(component);
        secondInput = wrapper.find('input').at(1)
        expect(secondInput.props().value).toBe(7.32);
    });

    it('input sum changed after input is editted', () => {
        store.dispatch(pocketActions.placeSum({ placedSum: 6, pocketDirection: CurrencyExchangeTypes.in }));
        wrapper = mount(component);
        firstInput = wrapper.find('input').first()
        expect(firstInput.props().value).toBe(5.28);
    });
});

describe('AmountInputField snapshots', () => {
    const render = () => renderer.create(component).toJSON();

    describe('initial state', () => {
        it('renders out/in inputs', () => {
            expect(render()).toMatchSnapshot();
        });
    });

    describe('rates are present', () => {
        beforeAll(() => {
            store.dispatch(actions.setCurrencyRates({ rate: 1.22, reverse: 0.88 }))
        });

        it('renders out/in inputs with updated store', () => {
            act(() => {
                store.dispatch(pocketActions.placeSum({ placedSum: 6, pocketDirection: CurrencyExchangeTypes.out }));
            });
            expect(render()).toMatchSnapshot();
        });

        it('renders out/in inputs with updated withdraw sum', () => {
            act(() => {
                store.dispatch(pocketActions.placeSum({ placedSum: 6, pocketDirection: CurrencyExchangeTypes.in }));
            });
            expect(render()).toMatchSnapshot();
        });

        it('renders out/in inputs with updated withdraw sum', () => {
            act(() => {
                store.dispatch(pocketActions.placeSum({ placedSum: 100, pocketDirection: CurrencyExchangeTypes.in }));
            });
            expect(render()).toMatchSnapshot();
        });

        it('renders correct out/in inputs if exceeding sum was placed', () => {
            act(() => {
                store.dispatch(pocketActions.placeSum({ placedSum: 150, pocketDirection: CurrencyExchangeTypes.in }));
            });
            expect(render()).toMatchSnapshot();
        });
    });
});

export default component;