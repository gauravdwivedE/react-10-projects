import { createSlice } from '@reduxjs/toolkit'

export const company = createSlice({
  name: 'singleCompany',
  initialState: {
    singleCompany: null,
    companies: null,
    filterString: ""
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload
    },
    setAllCompanies: (state, action) => {
      state.companies = action.payload
    },
    setFilterString: (state, action) => {
      state.filterString = action.payload
    }
  }
})


// Action creators are generated for each case reducer function
export const { setSingleCompany, setAllCompanies, setFilterString } = company.actions

export default company.reducer