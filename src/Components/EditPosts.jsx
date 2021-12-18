import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../Axios/Axios";

const EditPosts = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    title: "",
    author: "",
    loading: false,
  });

  let { title, author, loading } = state;
  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setState({ loading: true });
      let payload = { title, author };
      await Axios.put(`/posts/${id}`, payload);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setState({ loading: false });
  };
  let { id } = useParams();
  useEffect(() => {
    let fetchPosts = async () => {
      let existsData = await Axios.get(`/posts/${id}`);
      setState(existsData.data);
    };
    fetchPosts();
  }, [id]);
  return (
    <section id="postBlock" className="col-md-4 mx-auto bg-white p-4 mt-4">
      <article>
        <h2 className="h4 font-weight-bold text-success text-uppercase border-bottom">
          update post
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
            {loading === true ? "loading" : "update"}
          </button>
        </form>
      </article>
    </section>
  );
};

export default EditPosts;
