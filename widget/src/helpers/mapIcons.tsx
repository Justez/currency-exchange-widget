import React from 'react';

import { CurrencyMap } from 'types';
import EuroIcon from 'assets/icons/euro';
import Pound from 'assets/icons/pound';
import Dollar from 'assets/icons/dollar';
import Other from 'assets/icons/otherCurrency';

export default function mapCurrencyIcons(name: CurrencyMap) {
    switch (name) {
        case CurrencyMap.euro:
            return <EuroIcon />;
        case CurrencyMap.dollar:
            return <Dollar />;
        case CurrencyMap.pound:
            return <Pound />;
        default: 
            return <Other />;
    };
};