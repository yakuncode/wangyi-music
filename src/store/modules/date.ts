import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'date',
  initialState: {
    activeDate: 123
  },
  reducers: {
    setActiveDate (state, action) {
      console.log(action, 'action')
      state.activeDate = action.payload
    }
  }
})

export const { setActiveDate } = slice.actions
export default slice.reducer
