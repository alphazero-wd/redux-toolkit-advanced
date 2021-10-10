import { configureStore } from '@reduxjs/toolkit';
import posts from './reducers/posts';
export default configureStore({
  reducer: {
    posts,
  },
});
