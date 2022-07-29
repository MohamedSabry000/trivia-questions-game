import trivia from './Trivia';

export const getCategories = async () => await trivia.get("/api_category.php");

export const getQuestions = async (data) => await trivia.post("/api.php", { params: data });
