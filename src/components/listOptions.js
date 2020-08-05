import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, sortTodos } from '../actions';
import { Button, IconButton, Typography, Grid } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

function ListOptions() {
        const { selected, todos, sortOption } = useSelector(state => state)
        const dispatch = useDispatch()

        const changeToDone = () => {
            selected.forEach(todoId => {
                const todo = todos.find(todo => todo.id === todoId)
                dispatch(updateTodo({...todo, status: 0}))
            });
        }

        const toggleSort = () => {
            switch(sortOption) {
                case 0:
                    return dispatch(sortTodos(1))
                case 1:
                    return dispatch(sortTodos(2))
                case 2:
                    return dispatch(sortTodos(0))
                default:
                    return dispatch(sortTodos(0))
            }
        }

        return (
            <Grid container space-between="true">
                <Grid item xs={9}>
                    <Button variant="contained" onClick={changeToDone}>
                        Liberar Seleccionados
                    </Button>
                </Grid>
                <Grid item xs={3}>                    
                <IconButton onClick={toggleSort}>
                    <SortIcon />
                    <Typography>
                        Ordenar
                    </Typography>
                </IconButton>
                </Grid>
            </Grid>
        )
}

export default ListOptions;