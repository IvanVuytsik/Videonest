import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentComment: null,
    loading: false,
    error: false,
}


export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    createComment: (state, action) => {
        state.loading = false;
        state.currentComment = action.payload;
    },
    deleteComment: (state, action) => {
        state.loading = false;
        state.currentComment = action.payload;
    } 
 
  } 
})


export const { deleteComment, createComment } = commentSlice.actions;

export default commentSlice.reducer;