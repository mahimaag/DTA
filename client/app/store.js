import { createStore, combineReducers, applyMiddleware} from 'redux';

import reducers from './reducers';
import middleware from './middleware'

const store = createStore(combineReducers(reducers), applyMiddleware(...middleware));

store.subscribe(() => {
    // console.log('Store updated: ', store.getState());
});
export default store;
