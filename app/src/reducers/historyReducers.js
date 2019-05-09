import { combineReducers } from 'redux'
import { GET_HISTORY_SUBMIT, GET_HISTORY_SUCCESS, GET_HISTORY_FAILURE } from '../actions/historyActions'

const initialState = {
    isLoading: false,
    errorMsg: null,
    data: null
}

export default (state=initialState, action) => {
    switch (action.type) {
        case GET_HISTORY_SUBMIT:
            return { ...state, isLoading: true }
        case GET_HISTORY_FAILURE:
            return { ...state, isLoading: false, errorMsg: action.payload.message }
        case GET_HISTORY_SUCCESS:
            return { ...state, isLoading: false, errorMsg: null, data: action.payload }
        default:
            return { ...state }
    }
}