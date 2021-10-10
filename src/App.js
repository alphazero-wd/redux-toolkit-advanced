import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './components/Form';
import Posts from './components/Posts';
import {
  fetchPosts,
  selectTotalPosts,
  createPost,
  selectAllPosts,
  updatePost,
} from './reducers/posts';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  const count = useSelector(selectTotalPosts);
  const posts = useSelector(selectAllPosts);
  const [value, setValue] = useState({
    title: '',
    body: '',
  });
  const [edit, setEdit] = useState({
    editId: '',
    isEdit: false,
  });
  const onChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      alert('Please enter the value!');
      return;
    } else {
      if (edit.isEdit) {
        const post = posts.find((post) => post.id === edit.editId);
        dispatch(
          updatePost({
            ...post,
            id: post.id,
            title: value.title,
            body: value.body,
          })
        );
        setValue({ ...value, title: '', body: '' });
      } else {
        const newPost = {
          title: value.title,
          body: value.body,
          id: new Date().getTime().toString(),
          userId: new Date().getTime().toString(),
        };
        dispatch(createPost(newPost));
        setValue({ ...value, title: '', body: '' });
      }
    }
  };
  const editPost = (id) => {
    const post = posts.find((post) => post.id === id);
    setValue({ title: post.title, body: post.body });
    setEdit({ editId: id, isEdit: true });
  };
  return (
    <div className="container">
      <Form onChange={onChange} value={value} onSubmit={onSubmit} />
      <h1 className="text-center my-5">Posts</h1>
      {count > 0 ? (
        <Posts editPost={editPost} />
      ) : (
        <div className="text-center my-3">
          <h5>No Posts Found</h5>
        </div>
      )}
    </div>
  );
}

export default App;
