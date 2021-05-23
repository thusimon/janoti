import React, {createContext, useReducer, Dispatch } from 'react';
import { appReducer } from './app-reducer';
import { InitialStateType, Action } from '../types';

export const initialState: InitialStateType = {
  lastVisitTime: null,
  ja_en: [],
}

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});
