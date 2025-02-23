import { createSlice } from '@reduxjs/toolkit'

export const loadingReducer = createSlice({
  name: 'showLoading',
  initialState: {
    loading: false,
  },
  reducers: {
   
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoading } = loadingReducer.actions

export default loadingReducer.reducer