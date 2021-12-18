import React from "react";
import Axios from "../Axios/Axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreatePosts = () => {
  let navigate = useNavigate();
  let [state, setstate] = useState({
    title: "",
    author: "",
    loading: false,
  });
  let { title, author, loading } = state;
  let handleChange = e => {
    let { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setstate({ loading: true });
      let payload = { title, author };
      await Axios.post("/posts", payload);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setstate({ loading: false });
  };
  return (
    <section id="postBlock" className="col-md-4 mx-auto bg-white p-4 mt-4">
      <article>
        <h2 className="h4 font-weight-bold text-success text-uppercase border-bottom">
          create post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="enter title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              name="author"
              placeholder="enter author"
              value={author}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {loading === true ? "loading" : "submit"}
          </button>
        </form>
      </article>
    </section>
  );
};

export default CreatePosts;
