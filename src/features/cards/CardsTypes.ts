

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type FetchResponseCardsType = {
  cards: CardResponseType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: null,
  packCreated: string,
  packUpdated: string,
  token: string,
  tokenDeathTime: number
}


export type ArgFetchCards = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}


export type ArgCreateCard = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}


export type CardResponseType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string,
  type: string,
  rating: number,
  more_id: string,
  created: string,
  updated: string,
  __v: number
}

export type DeleteResponseType = {
  answer: string
  cardsPack_id: string
  comments: string
  created: string
  grade: number
  more_id: string
  question: string
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  __v: number
  _id: string
}

export type ArgUpdateCard = {
  _id: string
  question?: string
  answer?: string
}
export type ResponseUpdateType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}

export type ShowModalCardType = {
  type?:'modalInput'|'modalQuestion'
  show:boolean
  actionType?:'addCard'|'updateCard'|'deleteCard'
}
export type Grades = {
  grade?: number
  id?: string
}
