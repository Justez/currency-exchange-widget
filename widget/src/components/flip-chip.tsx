import React from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Flip from 'assets/icons/flip';

interface OwnProps {
    onFlip: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: theme.palette.primary.main,
    },
}));

const FlipChip = ({ onFlip }: OwnProps) => {
    const classes = useStyles();
    
    return (
        <Chip icon={<Flip />} className={classes.root} onClick={onFlip} variant="outlined" />
    )
};

export default FlipChip;