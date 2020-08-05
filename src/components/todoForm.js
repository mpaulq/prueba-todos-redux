import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTodo } from '../actions';

import { Grid, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';


function ToDoForm() {
    const formatDate = moment().format('YYYY-MM-DD');
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = React.useState("");
    const [limitDate, setLimitDate] = React.useState(formatDate)
    const { currentDate } = useSelector(state => state);
    const dispatch = useDispatch();
    
    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    } 

    const handleSubmit = event => {
        const status = moment(currentDate).isAfter(limitDate)? 2: 1;
        dispatch(createTodo({description, limitDate, status}));
        event.preventDefault()
    }

    
    return (
        <Grid container justify="flex-end" spacing={2}>
            <Fab color="primary" size="medium">
                <AddIcon onClick={handleClickOpen}/>
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Crear Tarea</DialogTitle>
                <DialogContent>
                    <form id="newTodo" onSubmit={handleSubmit}>
                        <TextField
                            label="Nueva tarea"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline />
                        <TextField
                            label="Fecha Límite"
                            variant="outlined"
                            type="date"
                            value={limitDate}
                            onChange={(e) => setLimitDate(e.target.value)} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button type="submit" form="newTodo" onClick={handleClose} color="primary">
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default ToDoForm;