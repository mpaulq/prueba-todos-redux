import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../actions';

import { List, Tooltip, Box, Typography, CircularProgress } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import moment from 'moment';
import TodoItem from './todoItem';

function ToDoList() {
    const { loading, todos, sortOption } = useSelector(state=> state);
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    const showStatusIcon = (status) => {
        switch(status) {
            case 0:
                return (
                    <Tooltip title="Liberado">
                        <AssignmentTurnedInIcon fontSize="large" style={{ color: 'green' }} />
                    </Tooltip>
                )
            case 1:
                return (
                    <Tooltip title="Pendiente">
                        <AssignmentIcon fontSize="large" color="primary" />
                    </Tooltip>
                )
            case 2:
                return (
                    <Tooltip title="Atrasado">
                        <AssignmentLateIcon fontSize="large" color="secondary" />
                    </Tooltip>
                )
            default:
                return (
                    <AssignmentIcon fontSize="large" color="primary" />
                )
        }
    }
    
    const sortTodos = (sortOption) => {
        switch(sortOption) {
            case 0:
                return todos.sort((a, b) => moment(a.created_at).isAfter(b.created_at))
            case 1:
                return todos.sort((a, b) => moment(a.limitDate).isBefore(b.limitDate))
            case 2:
                return todos.sort((a, b) => b.status - a.status)
            default:
                return todos.sort((a, b) => moment(a.created_at).isAfter(b.created_at))
        }
    }

    return(
        <List>
            {loading && <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>}
            {!loading && !todos.length && <Box display="flex" justifyContent="center" border={1} borderColor="grey.500"
            paddingTop={2} paddingBottom={2}>
                    <Typography>
                        No hay tareas para mostrar
                    </Typography>
                </Box>}
            {!loading && sortTodos(sortOption).map((todo) => {
                return(
                    <TodoItem key={todo.id} todo={todo} showIcon={showStatusIcon} />
                )
            }) }
        </List>
    )
}

export default ToDoList;