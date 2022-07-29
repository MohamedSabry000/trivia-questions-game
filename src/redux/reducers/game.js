import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    userName: '',
    level: '',
    categories: [],
    finishedCategories: [],
    selectedCategory: [],
    questions: [],
    selectedQuestion: null,
    questionIndex: 0,
  },
  reducers: {
    resetGame: (state) => {
      state.userName= '';
      state.level= '';

      state.categories= [];
      state.finishedCategories= [9,10,11,12,13,14,15,16,17,18];
      state.selectedCategory= null;

      state.questions= [];
      state.selectedQuestion= null;
    },
    setUserName: (state, action) =>         { state.user = action.payload; },
    setLevel: (state, action) =>            { state.level = action.payload; },
    setCategories: (state, action) =>       { state.categories = action.payload; },
    setFinishedCategories: (state, action) =>{ state.finishedCategories = [...state.finishedCategories, action.payload]; },
    setSelectedCategory: (state, action) => { state.selectedCategory = action.payload; },

    setQuestions: (state, action) =>        {
      state.questions = action.payload;
      state.selectedQuestion = !!action.payload[state.questionIndex] && action.payload[state.questionIndex];
    },
    setNextQuestion: (state, action) =>     { state.selectedQuestion = state.questions[++state.questionIndex]; },
  }
});

export const { resetGame, setUserName, setLevel, setCategories, setSelectedCategory, setNextQuestion, setQuestions, setSelectedQuestion, setFinishedCategories } = gameSlice.actions;

export default gameSlice.reducer;