import { useSelector } from 'react-redux';
import { selectAllPosts } from '../reducers/posts';
import Post from './Post';

const Posts = ({ editPost }) => {
  const posts = useSelector(selectAllPosts);
  return (
    <ul className="list-group">
      {posts.map((post) => (
        <Post key={post.id} editPost={editPost} {...post} />
      ))}
    </ul>
  );
};

export default Posts;
