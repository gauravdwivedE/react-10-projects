import { createSlice } from '@reduxjs/toolkit'

export const jobsReducer = createSlice({
  name: 'jobs',
  initialState: {
    jobs: null,
    searchTerm: "",
    searchFilter: null
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setFilter: (state, action) => {
      state.searchFilter = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setJobs, setSearchTerm, setFilter } = jobsReducer.actions

export default jobsReducer.reducer