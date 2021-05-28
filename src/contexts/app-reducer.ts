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
    case ActionType.SET_PROG_IDX: {
      return {
        ...state,
        progress_idx: action.data.progress_idx
      }
    }
    case ActionType.SET_WEEK_VIEW: {
      return {
        ...state,
        week_view: action.data.week_view
      }
    }
    default:
      return state;
  }
}
