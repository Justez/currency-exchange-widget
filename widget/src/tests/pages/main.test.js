import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import store from 'store';
import MainPage from 'pages/main';

const component = (
    <Provider store={store}>
        <MainPage />
    </Provider>
)

describe('Main Page snapshots', () => {
    it('renders main page', () => {
        const tree = renderer.create(component).toJSON();

        expect(tree).toMatchSnapshot();
    });
});