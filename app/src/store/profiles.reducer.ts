import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileData } from 'config'

export type ProfileState = Record<string, ProfileData>

const initialState: ProfileState = {}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileData>) => {
      // state[action.payload.full_name] = action.payload   ????
      return state
    },
  },
})

export const { setProfile } = profileSlice.actions

export default profileSlice.reducer
