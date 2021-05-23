import {ActionType, Action, InitialStateType } from '../types'

export const appReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case ActionType.SET_ALL_DATA: {
      return {
        ...state,
        ...action.data
      }
    }
    case ActionType.SET_LAST_VISIT:
      return {
        ...state,
        lastVisitTime: action.data.lastVisitTime
      }
    default:
      return state;
  }
}
