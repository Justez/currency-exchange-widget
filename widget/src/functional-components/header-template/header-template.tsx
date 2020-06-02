import React from 'react';
import { connect } from 'react-redux';
import { Box, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Dispatch, bindActionCreators } from 'redux';

import { actions as pocketsActions } from 'store/modules/pockets';
import PlaceAllIcon from 'assets/icons/placeAll';

interface DispatchProps {
    actions: {
        pockets: typeof pocketsActions;
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    iconButton: {
      height: '6vh',
      width: '6vh',
      backgroundColor: theme.palette.secondary.light,
      marginTop: theme.spacing(-1),
    },
    label: {
        marginLeft: theme.spacing(-1),
    },
  }));

const HeaderTemplate = ({ actions }: DispatchProps) => {
    const classes = useStyles();

    const handlePlaceAll = () => actions.pockets.placeAll()
    return (
        <Box width="100%" textAlign="center" p={2}>
            <Grid container justify="flex-end">
                <Grid item xs={10}>
                    <Typography variant="h6">Exchange currencies</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={handlePlaceAll} className={classes.iconButton}>
                        <PlaceAllIcon />
                    </IconButton>
                    <Typography variant="caption" noWrap className={classes.label}>place all</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    actions: {
        pockets: bindActionCreators(pocketsActions, dispatch),
    },
});

export default connect(undefined, mapDispatchToProps)(HeaderTemplate);