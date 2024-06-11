import { createSlice } from "@reduxjs/toolkit"; // Add this import

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    skillnaavData: null,
    reloadData: false,
    images: [], // Add images state
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
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    },
    AddImage: (state, action) => {
      state.images.push(action.payload);
    },
    RemoveImage: (state, action) => {
      state.images = state.images.filter(
        (image) => image._id !== action.payload
      );
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
  AddImage,
  RemoveImage,
  SetImages,
} = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
