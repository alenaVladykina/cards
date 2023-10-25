import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError, isAxiosError} from "axios";



export const appSlice = createSlice({
  name: 'appReduser',
  initialState: {
    error: null as string | null,
    isLoading: false,
    payloadMessage: null as string | null,
  },
  reducers: {
    setError: (state, actions: PayloadAction<{ error: string | null }>) => {
      state.error = actions.payload.error
    },
    successful: (state, action: PayloadAction<{ payloadMessage: string | null }>) => {
      state.payloadMessage = action.payload.payloadMessage
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith('/pending');
        },
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          if (!action.payload.showGlobalError) return;
          const err = action.payload.e as Error | AxiosError<{ error: string }>;
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message;
          } else {
            state.error = `Native error ${err.message}`;
          }
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith('/fulfilled');
        },
        (state) => {
          state.isLoading = false
        }
      )
  }
})

export const appReduser = appSlice.reducer
export const appActions = appSlice.actions


