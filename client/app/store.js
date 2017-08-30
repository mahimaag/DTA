import { createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';     //for enabling redux devTools (browser extension) in the application.
import reducers from './reducers';
import middleware from './middleware'

const store = createStore(combineReducers(reducers),composeWithDevTools(applyMiddleware(...middleware)));

store.subscribe(() => {
    // console.log('Store updated: ', store.getState());
});
export default store;
