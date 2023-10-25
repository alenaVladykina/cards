import React from 'react';
import {ArgCreateCard, ArgFetchCards, ArgUpdateCard, Grades} from "./CardsTypes";
import {instance} from "../../commons/api";

export const cardApi = {
  fetchCards: (arg: ArgFetchCards) => {
    return instance.get(`cards/card?&cardsPack_id=${arg.cardsPack_id}&pageCount=${arg.pageCount}&page=${arg.page}&cardQuestion=${arg.cardQuestion}`)
  },
  createCard: (card: ArgCreateCard) => {
    return instance.post('cards/card', {card})
  },
  removeCard: (id: string) => {
    return instance.delete(`cards/card?id=${id}`)
  },
  updateCard: (card: ArgUpdateCard) => {
    return instance.put('cards/card', {card})
  },
  grade: (arg: Grades) => {
    return instance.put('cards/grade', {grade: arg.grade, card_id: arg.id})
  }
}