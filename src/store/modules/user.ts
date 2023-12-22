import { createSlice } from '@reduxjs/toolkit'
import * as types from '../action-types'
export const slice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {}
  },
  reducers: {
    [types.LOGIN] (state, action) {
      state.userInfo = { ...action.payload }
    },
    [types.LOGIN_OUT] (state) {
      state.userInfo = {}
    }
  }
})
export const {  LOGIN, LOGIN_OUT } = slice.actions
export default slice.reducer
