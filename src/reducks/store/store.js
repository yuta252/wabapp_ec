import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
// Import router
import { connectRouter, routerMiddleware } from 'connected-react-router';
// Import Async
import thunk from 'redux-thunk';

import { ProductsReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers';

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            products: ProductsReducer,
            router: connectRouter(history),
            users: UsersReducer,
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
};
