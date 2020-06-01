import React from 'react';
import { Chip } from '@material-ui/core'
import Flip from 'assets/icons/flip';

interface OwnProps {
    onFlip: () => void;
}
const FlipChip = ({ onFlip }: OwnProps) => (
    <Chip icon={<Flip />} onClick={onFlip} variant="outlined" />
)

export default FlipChip