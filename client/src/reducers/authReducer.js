// client/src/reducers/authReducer.js

import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    userEmail: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case SIGN_IN:
        return { ...state, isSignedIn: true, userEmail: action.payload };
    case SIGN_OUT:
        return { ...state, isSignedIn: false, userEmail: null };
    default:
        return state;
    }
};
