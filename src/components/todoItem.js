import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, checkTodo } from '../actions';
import {
    ListItem,
    ListItemIcon,
    Checkbox, ListItemText,
    ListItemSecondaryAction,
    TextField
} from '@material-ui/core';
import moment from 'moment';

function ToDoItem({todo, showIcon}) {
    const { currentDate } = useSelector(state => state)
    const dispatch = useDispatch();
    
    const todoColor = (status) => {
        switch(status) {
            case 0:
                return '#00c851';
            case 1:
                return '#0099cc';
            case 2:
                return '#ffbb33';
            default:
                return '#0099cc';
        }
    }

    const limitDateFormatted = moment(todo.limitDate).format('YYYY-MM-DD');

    return(
        <ListItem alignItems="flex-start" style={{backgroundColor: todoColor(todo.status)}}>
            <ListItemIcon>
                <Checkbox onChange={() => dispatch(checkTodo(todo.id))}/>
            </ListItemIcon>
            <ListItemText primary={todo.description} secondary={
                <TextField
                    type="date"
                    defaultValue={limitDateFormatted}
                    onChange={(event) => dispatch(updateTodo({
                        ...todo,
                        limitDate: event.target.value,
                        status: moment(currentDate).isAfter(event.target.value)? 2: todo.status
                    }))} />
            } />
            <ListItemSecondaryAction>
                {showIcon(todo.status)}
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default ToDoItem;