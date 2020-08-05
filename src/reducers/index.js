import { SEND_QUERY, GET_TODOS, ADD_TODO, EDIT_TODO, SORT_TODOS, CHECK_TODO } from '../actions';

let defaultState = {
    loading: false,
    currentDate: new Date(),
    todos: [],
    selected: [],
    sortOption: 0, // opciones 0: fechaCrea, 1: fechaLimit y 2: status
}

const todoReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SEND_QUERY:
            return {
                ...state,
                loading: true
            }
        case GET_TODOS:
            return {
                ...state,
                loading: false,
                todos: action.payload
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => action.payload.id === todo.id? action.payload: todo)
            }
        case SORT_TODOS:
            return {
                ...state,
                sortOption: action.payload
            }
        case CHECK_TODO:
            return {
                ...state,
                selected: state.selected.includes(action.payload)?
                    state.selected.filter(id => id!==action.payload):
                    state.selected.concat(action.payload) 
            }
        default:
            return {
                ...state
            }
    }
}

export default todoReducer;