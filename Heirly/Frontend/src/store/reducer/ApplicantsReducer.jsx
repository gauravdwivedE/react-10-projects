import { createSlice } from '@reduxjs/toolkit'

export const ApplicantsReducer = createSlice({
  name: 'Applicant',
  initialState: {
    applicants: null,
  },
  reducers: {
    setApplicants: (state, action) => {
      state.applicants = action.payload
    },  
  }
})


// Action creators are generated for each case reducer function
export const { setApplicants } = ApplicantsReducer.actions

export default ApplicantsReducer.reducer