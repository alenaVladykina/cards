
export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
}

export type FetchPacksResponseType = {
  cardPacks: PackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};


export type ArgPostType = {
  name?: string,
  deckCover?: string
  private?: boolean
}
export type CreateResponseType = {
  _id: string,
  user_id: string,
  user_name: string,
  private: boolean,
  name: string,
  path: string,
  grade: number,
  shots: number,
  deckCover: string,
  cardsCount: number,
  type: string,
  rating: number,
  created: string,
  updated: string,
  more_id: string,
  __v: number
}
export type ArgUpdateType = {
  id: string
  name?: string
}

export type ResponseUpdateType = {
  _id: string,
  user_id: string,
  user_name: string,
  private: boolean,
  name: string,
  path: string,
  grade: number,
  shots: number,
  deckCover: string,
  cardsCount: number,
  type: string,
  rating: number,
  created: string,
  updated: string,
  more_id: string,
  __v: number
}
export type SortPacksType = {
  order: number,
  name: string
}
export type ArgFetchType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}

// export type ShowModalType = {
//   type?:'modalInput'|'modalQuestion'|'learn'
//   show:boolean
//   pack?:PackType
//   actionType?:'add'|'update'|'delete'|'learn'
//   id?:string
//   value?:string
//   valueSome?:string
// }
export type SortColumnType = {
  name: string
  order: boolean
}
