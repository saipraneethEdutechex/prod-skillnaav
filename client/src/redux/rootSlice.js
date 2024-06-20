import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    skillnaavData: null,
    reloadData: false,
  },
  reducers: {
    ShowLoading: (state, action) => {
      state.loading = true;
    },
    HideLoading: (state, action) => {
      state.loading = false;
    },
    SetSkillNaavData: (state, action) => {
      state.skillnaavData = action.payload;
    },
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    },
    UpdateDiscoverImageUrl: (state, action) => {
      if (state.skillnaavData && state.skillnaavData.discover) {
        state.skillnaavData.discover[0].imageUrl = action.payload;
      }
    },
  },
});

export const {
  ShowLoading,
  HideLoading,
  SetSkillNaavData,
  ReloadData,
  UpdateDiscoverImageUrl,
} = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
