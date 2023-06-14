import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = [];

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.push(action.payload);
    },
    removeImage: (state, action) => {
      return state.filter((image) => image.id !== action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    gallery: gallerySlice.reducer,
  },
});

export const { addImage, removeImage } = gallerySlice.actions;
export default store;
