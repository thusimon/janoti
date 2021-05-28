export enum SWMessageType {
  SKIP_WAITING,
  PAGE_LOADS,
  SEND_PAGE_INIT_DATA,
  SET_DB_PROG_IDX
}

export enum ActionType {
  SET_ALL_DATA,
  SET_NAV_OPT,
  SET_WEEK_VIEW,
  SET_PROG_IDX
}

export type VocabRowProp = {
  kana: string;
  kanji: string;
  type: string;
  trans: string;
}

export type InitialStateType = {
  progress_idx: number;
  ja_en: Array<VocabRowProp>;
  week_view: Array<Array<Array<VocabRowProp>>>;
  nav_opt: number;
}

export type Action = {
  type: ActionType;
  data: any;
}