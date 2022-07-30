import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  level: '',
  categories: [],
  finishedCategories: [9,10,11,12,13,14,15,16,17,18],
  selectedCategory: null,
  questions: [],
  selectedQuestion: null,
  questionIndex: 0,
  answers: {
    correct: 0,
    incorrect: 0,
    skipped: 0,
  },
  timeSpent: 0,
  isFinished: false,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    resetGame: (state) => {
      Object.keys(initialState).forEach(key => {
        state[key] = initialState[key];
      });
    },
    setUserName: (state, action) =>         { state.user = action.payload; },
    setLevel: (state, action) =>            { state.level = action.payload; },
    setCategories: (state, action) =>       { state.categories = action.payload; },
    setFinishedCategories: (state, action) =>{ state.finishedCategories = [...state.finishedCategories, action.payload]; },
    setSelectedCategory: (state, action) => { state.selectedCategory = action.payload; },

    setQuestions: (state, action) =>        {
      state.questions = action.payload;
      state.questionIndex = 0;
      state.selectedQuestion = !!action.payload[state.questionIndex] && action.payload[state.questionIndex];
    },
    setNextQuestion: (state, action) =>     { state.selectedQuestion = state.questions[++state.questionIndex]; },

    // Answers
    setCorrectAnswer: (state, action) =>    { state.answers.correct++; },
    setIncorrectAnswer: (state, action) =>  { state.answers.incorrect++; },
    setSkippedAnswer: (state, action) =>    { state.answers.skipped++; },
    // Time Spent of all questions
    setTimeSpent: (state, action) =>        { state.timeSpent += action.payload; },
  }
});

export const {
  resetGame, setUserName, setLevel,
  setCategories, setSelectedCategory,
  setNextQuestion, setQuestions,
  setSelectedQuestion, setFinishedCategories,
  setCorrectAnswer, setIncorrectAnswer, setSkippedAnswer,
  setTimeSpent } = gameSlice.actions;

export default gameSlice.reducer;