export enum SWMessageType {
  SKIP_WAITING,
  PAGE_LOADS,
  SEND_PAGE_INIT_DATA
}

export enum ActionType {
  SET_ALL_DATA,
  SET_LAST_VISIT
}

export type VocabRowProp = {
  kana: string;
  kanji: string;
  type: string;
  trans: string;
}

export type InitialStateType = {
  lastVisitTime: Date | null;
  ja_en: Array<VocabRowProp>;
}

export type Action = {
  type: ActionType;
  data: any;
}