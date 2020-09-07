import { get } from "../../utils/request";
import url from "../../utils/url";

const initialState = {
    getRequestQuantity: 0,
    putRequestQuantity: 0,
    postRequestQuantity: 0,
    deleteRequestQuantity: 0,
    error: null,
}

export const types = {
    START_GET_REQUEST: "APP/START_GET_REQUEST",
    FINISH_GET_REQUEST: "APP/FINISH_GET_REQUEST",
    START_PUT_REQUEST: "APP/START_PUT_REQUEST",
    FINISH_PUT_REQUEST: "APP/FINISH_PUT_REQUEST",
    START_POST_REQUEST: "APP/START_POST_REQUEST",
    FINISH_POST_REQUEST: "APP/FINISH_POST_REQUEST",
    START_DELETE_REQUEST: "APP/START_DELETE_REQUEST",
    FINISH_DELETE_REQUEST: "APP/FINISH_DELETE_REQUEST",
    SET_ERROR: "APP/SET_ERROR",
}

export const actions = {
    startGetRequest: () => {
        return (dispatch)=>{
            dispatch({
                type: types.START_GET_REQUEST
            });
        }
    },
    finishGetRequest: () => {
        return {
            type: types.FINISH_GET_REQUEST
        }
    },
    startPostRequest: () => {
        return {
            type: types.START_POST_REQUEST
        }
    },
    finishPostRequest: () => {
        return {
            type: types.FINISH_POST_REQUEST
        }
    },
    startPutRequest: () => {
        return {
            type: types.START_PUT_REQUEST
        }
    },
    finishPutRequest: () => {
        return {
            type: types.FINISH_PUT_REQUEST
        }
    },
    startDeleteRequest: () => {
        return {
            type: types.START_DELETE_REQUEST
        }
    },
    finishDeleteRequest: () => {
        return {
            type: types.FINISH_DELETE_REQUEST
        }
    },
    setError: (error) => {
        return {
            type: types.SET_ERROR,
            error
        }
    },
    test: () => {
        return (dispatch) => {
            return get(url.test)
                .then(result => {
                    if (!result.error) {
                        return Promise.resolve(result.data);
                    } else {
                        dispatch(actions.setError(result.error));
                        return Promise.reject(result.error);
                    }
                })
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_GET_REQUEST:
            return {
                ...state, getRequestQuantity: state.getRequestQuantity + 1
            };
        case types.FINISH_GET_REQUEST:
            return {
                ...state, getRequestQuantity: state.getRequestQuantity - 1
            };
        case types.START_DELETE_REQUEST:
            return {
                ...state, deleteRequestQuantity: state.deleteRequestQuantity + 1
            };
        case types.FINISH_DELETE_REQUEST:
            return {
                ...state, deleteRequestQuantity: state.deleteRequestQuantity - 1
            };
        case types.FINISH_POST_REQUEST:
            return {
                ...state, postRequestQuantity: state.postRequestQuantity - 1
            };
        case types.START_POST_REQUEST:
            return {
                ...state, postRequestQuantity: state.postRequestQuantity + 1
            };
        case types.FINISH_PUT_REQUEST:
            return {
                ...state, putRequestQuantity: state.putRequestQuantity - 1
            };
        case types.START_PUT_REQUEST:
            return {
                ...state, putRequestQuantity: state.putRequestQuantity + 1
            };
        case types.SET_ERROR:
            return {
                ...state, error: action.error
            };
        default:
            return state;
    }
}

export default reducer;

export const getError = (state) => state.app.error;
export const getGetRequestQuantity = (state) => state.app.getRequestQuantity;
export const getPutRequestQuantity = (state) => state.app.putRequestQuantity;
export const getPostRequestQuantity = (state) => state.app.postRequestQuantity;
export const getDeleteRequestQuantity = (state) => state.app.deleteRequestQuantity;