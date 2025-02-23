import { createSlice } from '@reduxjs/toolkit'

export const adminJobsReducer = createSlice({
  name: 'singleCompany',
  initialState: {
    adminJobs: null,
    filterString: ""
  },
  reducers: {
    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload
    },
    setFilterString: (state, action) => {
      state.filterString = action.payload
    },
  }
})


// Action creators are generated for each case reducer function
export const { setAdminJobs, setFilterString } = adminJobsReducer.actions

export default adminJobsReducer.reducer