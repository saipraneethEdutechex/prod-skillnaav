import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    skillnaavData: null,
    images: [],
    reloadData: false,
  },
  reducers: {
    ShowLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
    SetSkillNaavData: (state, action) => {
      state.skillnaavData = action.payload;
    },
    SetImages: (state, action) => {
      state.images = action.payload;
    },
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    },
  },
});

export const {
  ShowLoading,
  HideLoading,
  SetSkillNaavData,
  SetImages,
  ReloadData,
} = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
