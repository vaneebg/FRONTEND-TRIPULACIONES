import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice'
import routes from '../features/routes/routesSlice'
import comments from '../features/comments/commentsSlice'
import scores from '../features/scores/scoresSlice'
import quiz from '../features/quiz/quizSlice'



export const store = configureStore({
  reducer: {
    auth,
    routes,
    comments,
    scores,
    quiz
  },
});
