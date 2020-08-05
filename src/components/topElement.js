import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';

function TopElement() {
    const currentDate = useSelector(state => state.currentDate);
    const currDateFormatted = moment(currentDate).format('DD-MM-YYYY');

    return(
        <Grid container alignItems="center" spacing={2}>
            <Grid item xs={9}>
                <Typography variant="h4">Cosas por Hacer</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="h5">Hoy: {currDateFormatted}</Typography>
            </Grid>
        </Grid>
        
    )
}

export default TopElement;