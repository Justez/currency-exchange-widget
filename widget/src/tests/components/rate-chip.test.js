import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import RateChip from 'components/rate-chip';
import { actions as currencyRatesActions } from 'store/modules/currency-rates';

import store from 'store';

const component = (
    <Provider store={store}>
        <RateChip />
    </Provider>
)

let wrapper, chip, label;

describe('RateChip component', () => {
    const load = () => {
        wrapper = mount(component);
        chip = wrapper.find('div[role="button"]');
    };

    beforeAll(() => load());

    it('is rendered', () => {
        expect(chip.exists()).toBeTruthy();
    });

    it('shows unavailable', () => {
        label = chip.find('span[test-id="rate-display-error"]')
        expect(label.props().children).toBe('unavailable');
    })

    it('renders unavailable state correctly', () => {
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows label with rates', () => {
        store.dispatch(currencyRatesActions.setCurrencyRates({ rate: 1.22, reverse: 0.88 }));
        load();
        label = chip.find('[test-id="rate-display"]').at(0);
        expect(label.props().children[0]).toBe('1');
        expect(label.props().children[3]).toBe(1.22);
    });
});
