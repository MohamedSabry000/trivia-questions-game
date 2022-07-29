import trivia from './Trivia';

export const getCategories = async () => await trivia.get("/api_category.php");

export const getQuestions = async (data) => await trivia.post(`https://opentdb.com/api.php?amount=${data.amount || 10}&category=${data.category}&difficulty=${data.difficulty}`);
