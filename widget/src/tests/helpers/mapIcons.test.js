import React from 'react';

import { CurrencyMap } from 'types';
import Pound from 'assets/icons/pound';
import Dollar from 'assets/icons/dollar';
import EuroIcon from 'assets/icons/euro';
import Other from 'assets/icons/otherCurrency';
import mapIcons from 'helpers/mapIcons';

describe('mapIcons helper', () => {
    test('retrieves euro icon', () => {
        expect(mapIcons(CurrencyMap.euro)).toStrictEqual(<EuroIcon />);
    });

    test('retrieves dollar icon', () => {
        expect(mapIcons(CurrencyMap.dollar)).toStrictEqual(<Dollar />);
    });

    test('retrieves pound icon', () => {
        expect(mapIcons(CurrencyMap.pound)).toStrictEqual(<Pound />);
    });

    test('retrieves uknown icon', () => {
        expect(mapIcons()).toStrictEqual(<Other />);
    });
});