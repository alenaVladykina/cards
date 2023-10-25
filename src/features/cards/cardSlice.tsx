import React from 'react';
import {createSlice} from "@reduxjs/toolkit";
import {
  ArgCreateCard,
  ArgFetchCards, ArgUpdateCard,
  CardResponseType,
  DeleteResponseType, FetchResponseCardsType, Grades, ResponseUpdateType, ShowModalCardType
} from "./CardsTypes";
import {createAppAsyncThunk, thunkTryCatch} from "../../commons/utils";
import {cardApi} from "./cardApi";


const cardsSlice = createSlice({
    name: 'card',
    initialState: {
      cardItems: [] as CardResponseType[],
      cardsTotalCount: 3,
      maxGrade: 5,
      minGrade: 1,
      page: 1,
      pageCount: 5,
      packUserId: '',
    },
    reducers: {},
    extraReducers: (builder => {
      builder
        .addCase(fetchCards.fulfilled, (state, action) => {
          const cards = action.payload.cards.cards
          state.cardItems = cards;
          state.cardsTotalCount = action.payload.cards.cardsTotalCount
          state.maxGrade = action.payload.cards.maxGrade
          state.minGrade = action.payload.cards.minGrade
          state.page = action.payload.cards.page
          state.pageCount = action.payload.cards.pageCount
          state.packUserId = action.payload.cards.packUserId

        })
        .addCase(createCard.fulfilled, (state, action) => {
            state.cardItems.unshift(action.payload.card)
          }
        )
        .addCase(removeCard.fulfilled, (state, action) => {
          const index = state.cardItems.findIndex((card) => card._id === action.payload.card._id)
          if (index !== -1) state.cardItems.splice(index, 1)
        })
        .addCase(updateCard.fulfilled, (state, action) => {
          const index = state.cardItems.findIndex((card) => card._id === action.payload.updateCard._id)
          if (index !== -1) state.cardItems[index] = action.payload.updateCard
        })
    })
  }
)

const fetchCards = createAppAsyncThunk<{ cards: FetchResponseCardsType }, ArgFetchCards>(
  'cards/fetch',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const {dispatch} = thunkAPI
      const res = await cardApi.fetchCards(arg)
      return {cards: res.data}
      // dispatch(authActions.isLoginIn(true))
    })
  }
)

const createCard = createAppAsyncThunk<{ card: CardResponseType }, ArgCreateCard>(
  'cards/create',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await cardApi.createCard(arg)
      return {card: res.data.newCard}
    })
  }
)

const removeCard = createAppAsyncThunk<{ card: DeleteResponseType }, string>(
  'cards/remove',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await cardApi.removeCard(arg)
      return {card: res.data.deletedCard}
    })
  }
)

const updateCard = createAppAsyncThunk<{ updateCard: ResponseUpdateType }, ArgUpdateCard>(
  'cards/update',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      debugger
      const res = await cardApi.updateCard(arg)
      return {updateCard: res.data.updatedCard}
    })
  }
)


const grade = createAppAsyncThunk<any, Grades>(
  'cards/grade',
  (arg, thunkAPI) => {
    debugger
    return thunkTryCatch(thunkAPI, async () => {
      const {dispatch} = thunkAPI
      const res = await cardApi.grade(arg)
    })
  })

export const cardReduser = cardsSlice.reducer
export const cartsThunk = {fetchCards, createCard, removeCard, updateCard, grade}

