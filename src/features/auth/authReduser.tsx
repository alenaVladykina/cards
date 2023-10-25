import {ArgChangePassword, ArgLoginType, ArgRegistrationType, ChangeProfileType, ProfileType} from './authTypes'
import {createSlice,} from "@reduxjs/toolkit";
import {authApi} from "./authApi";
import {createAppAsyncThunk, thunkTryCatch} from "../../commons/utils";
import {appActions} from "../../app/appSlice";


export const authSlice = createSlice({
  name: 'auth',
  initialState:
    {
      profile: null as ProfileType | null,
      isLoginIn: false,
    },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile
        state.isLoginIn = true
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isLoginIn = true
        debugger
      })
  },
})

const changeDateProfile = createAppAsyncThunk<ChangeProfileType, any>(
  "auth/changeDateProfile",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.changeDateProfile(arg)

      return {avatar: res.data.updatedUser.avatar}
    })
  }
)
const authMe = createAppAsyncThunk<any, void>(
  "auth/me",
  async (arg: any, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      // const {dispatch} = thunkAPI
      const response = await authApi.me()
      console.log(response.data)
      return {profile: response.data}
    })
  })


const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>(
  "auth/login",
  async (arg: ArgLoginType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const response = await authApi.login(arg)
      return {profile: response.data};
    })
  })


const register = createAppAsyncThunk<void, ArgRegistrationType>(
  "auth/register",
  async (arg, thunkAPI) => {
    debugger
    return thunkTryCatch(thunkAPI, async () => {
      const {dispatch} = thunkAPI
      const res = await authApi.register(arg)
      dispatch(appActions.successful({payloadMessage: res.data.info}))
    })
  })


const forgot = createAppAsyncThunk<{ email: string }, string>(
  "auth/forgot",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const {dispatch} = thunkAPI
      const res = await authApi.forgotPassword(arg)
      dispatch(appActions.successful({payloadMessage: res.data.info}))
      return {email: arg}
    })
  })


const changePassword = createAppAsyncThunk<void, ArgChangePassword>(
  "auth/changePassword",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const {dispatch} = thunkAPI
      const res = await authApi.changePassword(arg)
      dispatch(appActions.successful({payloadMessage: res.data.info}))
    })
  }
)


export const authReduser = authSlice.reducer;
export const authThunk = {login, register, forgot, changePassword, changeDateProfile, authMe};
export const authActions = authSlice

