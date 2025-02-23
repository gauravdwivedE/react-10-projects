import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  loadingReducer  from './reducer/loadingReducer'
import  authReducer  from './reducer/authReducer'
import jobsReducer from './reducer/jobsReducer'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import  companyReducer from './reducer/companyReducer'
import  adminJobsReducer  from './reducer/adminJobsReducer'
import  ApplicantsReducer  from './reducer/ApplicantsReducer'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  showLoading: loadingReducer,
  user: authReducer,
  jobs: jobsReducer,
  company: companyReducer,
  adminJobs: adminJobsReducer,
  applicants: ApplicantsReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

