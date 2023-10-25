import {createSlice} from "@reduxjs/toolkit";
import {
  ArgFetchType,
  ArgPostType,
  CreateResponseType,
  FetchPacksResponseType,
  PackType,
  ResponseUpdateType
} from "./packsTypes";
import {createAppAsyncThunk, thunkTryCatch} from "../../commons/utils";
import {packApi} from "./packsApi";
import {appActions} from "../../app/appSlice";


export const packSlice = createSlice({
  name: 'pack',
  initialState: {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 100,
    maxCardsCount: 10,
    minCardsCount: 0,
    page: 1,
    pageCount: 15
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPacks.fulfilled, (state, action) => {
        const packsPage = action.payload.packsPage
        state.cardPacks = packsPage.cardPacks;
        state.page = packsPage.page;
        state.pageCount = packsPage.pageCount;
        state.cardPacksTotalCount = packsPage.cardPacksTotalCount;
        state.minCardsCount = packsPage.minCardsCount;
        state.maxCardsCount = packsPage.maxCardsCount;
      })
      .addCase(createPacks.fulfilled, (state, actions) => {
        state.cardPacks.unshift(actions.payload.pack)
      })
      .addCase(removePacks.fulfilled, (state, actions) => {
        const index = state.cardPacks.findIndex((pack) => pack._id === actions.payload.packId)
        if (index !== -1) state.cardPacks.splice(index, 1)
      })
      .addCase(updatePacks.fulfilled, (state, actions) => {
        const index = state.cardPacks.findIndex((pack) => pack._id === actions.payload.pack._id)
        if (index !== -1) state.cardPacks[index] = actions.payload.pack
      })
  }
})


const fetchPacks = createAppAsyncThunk<{ packsPage: FetchPacksResponseType }, ArgFetchType>(
  "pack/get",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packApi.packsGet(arg)
      return {packsPage: res.data}
    })
  })

const createPacks = createAppAsyncThunk<{ pack: CreateResponseType }, ArgPostType>(
  "pack/create",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packApi.packPost(arg)
      return {pack: res.data.newCardsPack}
    })
  })


const removePacks = createAppAsyncThunk<any, string>(
  "pack/remove",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packApi.packRemove(arg)
      return {packId: res.data.deletedCardsPack._id}
    })
  })


const updatePacks = createAppAsyncThunk<{ pack: ResponseUpdateType }, any>(
  "pack/update",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packApi.packUpdate(arg)
      return {pack: res.data.updatedCardsPack}
    }, true)
  })

const showModal = createAppAsyncThunk<{ showModal: boolean }, any>(
  "showModal",
  (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, () => {
      const {dispatch} = thunkAPI
      // dispatch(appActions.showModal({showModal: arg}))
    })
  })

export const packReduser = packSlice.reducer
export const packActions = packSlice.actions
export const packThunk = {fetchPacks, createPacks, removePacks, updatePacks, showModal}