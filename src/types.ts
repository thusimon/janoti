export enum SWMessageType {
  SKIP_WAITING,
  PAGE_LOADS,
  SEND_PAGE_INIT_DATA
}

export enum ActionType {
  SET_ALL_DATA,
  SET_NAV_OPT
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
  nav_opt: number;
}

export type Action = {
  type: ActionType;
  data: any;
}