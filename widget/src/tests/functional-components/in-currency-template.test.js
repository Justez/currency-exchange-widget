import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import store from 'store';
import InCurrencyTemplate from 'functional-components/in-currency-template';

const component = (
    <Provider store={store}>
        <InCurrencyTemplate />
    </Provider>
)

describe('In Currency template snapshots', () => {
    it('renders in-currency-template', () => {
        const tree = renderer.create(component).toJSON();

        expect(tree).toMatchSnapshot();
    });
});