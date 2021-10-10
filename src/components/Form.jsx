const Form = ({ onChange, onSubmit, value }) => {
  return (
    <form className="my-5" onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control"
        name="title"
        placeholder="Post Title"
        value={value.title}
        onChange={onChange}
      />
      <textarea
        name="body"
        className="form-control my-3"
        placeholder="Post Body"
        cols="30"
        rows="10"
        value={value.body}
        onChange={onChange}
      ></textarea>
      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  );
};

export default Form;
