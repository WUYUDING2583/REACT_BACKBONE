import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./modules";

let finalCreateStore;
//If run in development environment, and browser has installed debug plugin
//then create store which contains the debug plugin
if(process.env.NODE_ENV!=="production"){
    if(window.__REDUX_DEVTOOLS_EXTENSION__){
        finalCreateStore=compose(
            applyMiddleware(logger,thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )(createStore);
    }else{
        finalCreateStore = applyMiddleware(thunk,logger)(createStore);
    }
}else{
    finalCreateStore = applyMiddleware(thunk)(createStore);
}

export default function configureStore(initialState){
    const store=finalCreateStore(rootReducer,initialState);

    //support reducer hot loading
    if(process.env.NODE_ENV!=="production"&&module.hot){
        module.hot.accept("./modules",()=>
            store.replaceReducer(require("./modules"))
        );
    }

    return store;
}