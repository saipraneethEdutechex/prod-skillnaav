import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    skillnaavData: null,
    reloadData: false,
    images: [],
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
    SetImages: (state, action) => {
      state.images = action.payload;
    },
  },
});

export const {
  ShowLoading,
  HideLoading,
  SetSkillNaavData,
  ReloadData,
  SetImages,
} = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
