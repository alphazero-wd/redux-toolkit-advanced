import { useDispatch } from 'react-redux';
import { removePost } from '../reducers/posts';

const Post = ({ id, userId, title, body, editPost }) => {
  const dispatch = useDispatch();
  return (
    <li className="list-group-item ">
      <div className="row justify-content-between align-items-center">
        <div className="col-lg-9">
          <h5 className="text-capitalize">{title}</h5>
          <h6 className="text-secondary">Creator Id: {userId}</h6>
          <p className="body">{body}</p>
        </div>
        <div className="col-lg-3 btn-group">
          <button className="btn btn-primary" onClick={() => editPost(id)}>
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(removePost(id))}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default Post;
