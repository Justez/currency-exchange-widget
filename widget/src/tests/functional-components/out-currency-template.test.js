import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import store from 'store';
import OutCurrencyTemplate from 'functional-components/out-currency-template';

const component = (
    <Provider store={store}>
        <OutCurrencyTemplate />
    </Provider>
);

describe('Out Currency template snapshots', () => {
    it('renders out-currency-template', () => {
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
});