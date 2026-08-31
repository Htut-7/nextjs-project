const ROUTES = {
  HOME: "/",
  QUESTIONS: "/all-question",
  LOGIN: "/Login",
  Register: "/Register",
  ASK: "/question/create",
  QUESTION_DETAILS: (id: string) => "/question/" + id,
  TAG: "/tags",
};

export default ROUTES;
