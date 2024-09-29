import { Reducer, configureStore } from '@reduxjs/toolkit';

import { ActionType, StateType } from '../types';
import { initialState } from './initialState';
import { reducers } from './reducers';

require('../aristarh');

const dispatcher: Reducer<StateType, ActionType> = (state = initialState, action) => {
    const { type, payload } = action;

    Aristarh.voice(`[dispatcher]: triggered ${type}, payload:`, payload);

    reducers.forEach(reducer => {
        state = reducer(state, action)
    })

    return state;
}

export const store = configureStore({
    reducer: dispatcher,
});