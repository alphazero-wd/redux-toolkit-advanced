import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
const url = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
});

export const removePost = createAsyncThunk('post/removePost', async (id) => {
  await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
  return id;
});

export const createPost = createAsyncThunk('post/createPost', async (post) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
});

export const updatePost = createAsyncThunk('post/updatePost', async (post) => {
  const res = await fetch(`${url}/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
});

export const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, postsAdapter.upsertMany)
      .addCase(removePost.fulfilled, postsAdapter.removeOne)
      .addCase(createPost.fulfilled, postsAdapter.addOne)
      .addCase(updatePost.fulfilled, postsAdapter.upsertOne);
  },
});
export const {
  selectTotal: selectTotalPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectAll: selectAllPosts,
  selectEntities: selectPostEntities,
} = postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;
