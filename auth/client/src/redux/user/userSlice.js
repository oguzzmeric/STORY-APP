import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false 
};

const userSlice = createSlice({
    name: 'user',
    initialState, // Buradaki yazım hatasını düzeltmiştik
    reducers: {
        Signinstart: (state) => {
            state.loading = true;
        },
        Signinsucces: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        Signinfailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Aksiyonları export ediyoruz
export const { Signinstart, Signinsucces, Signinfailure } = userSlice.actions;

// Reducer'ı default export ile dışa aktarıyoruz
export default userSlice.reducer;