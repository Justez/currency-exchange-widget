import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import store from 'store';
import Header from 'functional-components/header-template';

const component = (
    <Provider store={store}>
        <Header />
    </Provider>
);

describe('Header snapshots', () => {
    it('renders header', () => {
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
});