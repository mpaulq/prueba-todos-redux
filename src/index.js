import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './reducers';
import { Container, Grid } from '@material-ui/core';
import ListOptions from './components/listOptions';
import TodoList from './components/todoList';
import TodoForm from './components/todoForm';
import TopElement from './components/topElement';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(todoReducer, composeEnhancer(applyMiddleware(thunk)));
class App extends Component {
    render() {
        return(
            <Container fixed style={{paddingLeft:'10%', paddingRight:'10%'}}>
                <TopElement />
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <ListOptions />
                    </Grid>
                    <Grid item>
                        <TodoList />
                    </Grid>
                    <Grid item>
                        <TodoForm />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));