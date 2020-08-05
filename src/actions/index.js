//import fetch from 'cross-fetch';

export const SEND_QUERY = 'SEND_QUERY';
export const GET_TODOS = 'GET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const SORT_TODOS = 'SORT_TODOS';
export const CHANGE_FORM = 'CHANGE_FORM';
export const CHECK_TODO = 'CHECK_TODO';

export const sendQuery = () => {
    return {
        type: SEND_QUERY
    }
}

export const getTodos = todos => {
    return {
        type: GET_TODOS,
        payload: todos
    }
}

export const addTodo = todo => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const editTodo = todo => {
    return {
        type: EDIT_TODO,
        payload: todo
    }
}

export const sortTodos = sortOption => {
    return {
        type: SORT_TODOS,
        payload: sortOption
    }
}

export const checkTodo = todoId => {
    return {
        type: CHECK_TODO,
        payload: todoId
    }
}

export const fetchTodos = () => dispatch => {
    const url = 'http://localhost:5000/todos';
    dispatch(sendQuery())
    fetch(url)
        .then(res => res.json())
        .then(json => {
            dispatch(getTodos(json))
        })
}

export const createTodo = (data) => dispatch => {
    const url = 'http://localhost:5000/todos';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            ...data,
            limitDate: new Date(data.limitDate),
            created_at: new Date(),
            updated_at: new Date()
        })
    }
    fetch(url, requestOptions)
        .then(res => res.json())
        .then(json => {
            dispatch(addTodo(json))
        })
}

export const updateTodo = (todo) => dispatch => {
    const url = `http://localhost:5000/todos/${todo.id}`;
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            ...todo,
            limitDate: new Date(todo.limitDate),
            updated_at: new Date()
        })
    }
    fetch(url, requestOptions)
        .then(res => res.json())
        .then(json => {
            dispatch(editTodo(todo))
        })
}