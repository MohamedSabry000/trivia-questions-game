import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    userName: '',
    level: '',
    categories: [],
    selectedCategory: [],
    questions: [],
    selectedQuestion: [],
  },
  reducers: {
    resetGame: (state) => {
      state.userName= '';
      state.level= '';
      state.categories= [];
      state.selectedCategory= [];
      state.questions= [];
      state.selectedQuestion= [];
    },
    setUserName: (state, action) =>         { state.user = action.payload; },
    setLevel: (state, action) =>            { state.level = action.payload; },
    setCategories: (state, action) =>       { state.categories = action.payload; },
    setSelectedCategory: (state, action) => { state.selectedCategory = action.payload; },
    setQuestions: (state, action) =>        { state.questions = action.payload; },
    setSelectedQuestion: (state, action) => { state.selectedQuestion = action.payload; },
  }
});

export const { resetGame, setUserName, setLevel, setCategories, setSelectedCategory, setQuestions, setSelectedQuestion } = gameSlice.actions;

export default gameSlice.reducer;