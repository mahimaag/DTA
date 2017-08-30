import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import middleware from './middleware'

const store = createStore(combineReducers(reducers),composeWithDevTools(
    applyMiddleware(...middleware)
));

store.subscribe(() => {
    // console.log('Store updated: ', store.getState());
});
export default store;
