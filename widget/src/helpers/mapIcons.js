import React from 'react';
import EuroIcon from '../assets/icons/euro';
import Pound from '../assets/icons/pound';
import Dollar from '../assets/icons/dollar';

export default function mapCurrencyIcons(name) {
    let icon = <></>
    
    switch (name) {
        case 'euro':
            icon = <EuroIcon />
        case 'dollar':
            icon = <Dollar />
        case 'pounds':
            icon = <Pound />
    }
    
    return icon
}