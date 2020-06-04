import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import store from 'store';
import { actions as currencyActions } from 'store/modules/currencies';
import { defaultState as defaultCurrencyState } from 'store/modules/currencies/reducer';
import FlipChip from 'components/flip-chip';
import CurrencySelects from './currency-select.test';
import AmountInputs from './amount-input-field.test';

const action = jest.fn();

const flipChip = shallow(<FlipChip onFlip={action} />);

describe('FlipChip component', () => {
  it('Place all button calls redux action', () => {
    flipChip.props().onClick();
    expect(action).toBeCalled();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<FlipChip onFlip={action} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('FlipChip integrations', () => {
  let wrapper, firstInput, secondInput;

  describe('Currency selects', () => {
    it('Currency selects respond to flip action', () => {
      store.dispatch(currencyActions.flipSelectedCurrencies());
      wrapper = mount(CurrencySelects);
      firstInput = wrapper.find('#choose-out-currency').first();
      secondInput = wrapper.find('#choose-in-currency').first();
      expect(firstInput.props().value).toBe(defaultCurrencyState.in);
      expect(secondInput.props().value).toBe(defaultCurrencyState.out);
    });
  });

  describe('Amount inputs', () => {
    it('Amount inputs respond to flip action', () => {
      wrapper = mount(AmountInputs);
      firstInput = wrapper.find('input').first().props().value;
      secondInput = wrapper.find('input').at(1).props().value;
      store.dispatch(currencyActions.flipSelectedCurrencies());
      wrapper = mount(AmountInputs);
      expect(wrapper.find('input').first().props().value).toBe(secondInput);
    });
  });
});