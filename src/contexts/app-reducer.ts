import {ActionType, Action, InitialStateType } from '../types'

export const appReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case ActionType.SET_ALL_DATA: {
      return {
        ...state,
        ...action.data
      }
    }
    case ActionType.SET_NAV_OPT:
      return {
        ...state,
        nav_opt: action.data.nav_opt
      }
    default:
      return state;
  }
}
