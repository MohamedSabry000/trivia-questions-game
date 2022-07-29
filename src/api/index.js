import trivia from './Trivia';

export const getCategories = async () => await trivia.get("/api_category.php");

export const getRank = async (score) => await trivia.post("/rank", { score });
