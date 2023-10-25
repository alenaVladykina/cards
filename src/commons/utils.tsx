import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../app/store";
import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {useEffect, useState} from 'react'
import {appActions} from "../app/appSlice";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: unknown
}>()


export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, any>,
  logic: Function,
  modal: boolean = false,
  showGlobalError: boolean = true) => {
  const {rejectWithValue, dispatch} = thunkAPI
  try {
    return await logic()

  } catch (e) {
    return rejectWithValue({e, showGlobalError})
  }
}


export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export const displayDate = (value: any) => {
  const newDate = new Date(value)
  const date = newDate.toLocaleDateString()
  return date
}