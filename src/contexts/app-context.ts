import React, {createContext, Dispatch } from 'react';
import { InitialStateType, Action, VocabRowProp } from '../types';

export const initialState: InitialStateType = {
  progress_idx: 0,
  ja_en: [],
  week_view: [[[]]],
  nav_opt: 0
}

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});
