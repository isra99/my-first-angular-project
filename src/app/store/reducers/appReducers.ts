import { ACTION_LOAD_PROFILE, ACTION_SET_INFO, ACTION_SET_PRICE, ACTION_SHOW_PROFILE, ACTION_SET_SYMBOL} from '../actions/appActions'

export interface appReducerState {
    symbol: string,
    info: object,
    price: object,
    loadProfile: boolean,
    showProfile: boolean
}

const initialState = {
    symbol: '',
    info: {},
    price: {},
    loadProfile: false,
    showProfile: false
}

export function reducer(state = initialState, action){
    console.log("Inside Reducer");
    console.log(state.symbol);
    switch(action.type) {
        case ACTION_SET_SYMBOL:
            return {
                ...state,
                symbol: action.data
            }
        case ACTION_SET_INFO:
            return {
                ...state,
                info: action.data
            }
        case ACTION_SET_PRICE:{
            console.log(state.info);
            return {
                ...state,
                price: action.data
            }
        }
        case ACTION_LOAD_PROFILE:
            return {
                ...state,
                loadProfile: true
            }
        case ACTION_SHOW_PROFILE:
            return {
                ...state,
                showProfile: true
            }
    }
    return state
}