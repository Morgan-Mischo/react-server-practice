import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import promiseMiddleware from 'redux-promise-middleware'; 
import entriesReducer from './entriesReducer'; 
import writerReducer from './writerReducer'; 

const rootReducer = combineReducers({
    writer: writerReducer, 
    entries: entriesReducer
}); 

export default createStore(rootReducer, applyMiddleware(promiseMiddleware)); 