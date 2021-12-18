import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../Axios/Axios";

const Home = () => {
  let { id } = useParams();
  let [searchTerm, setsearchTerm] = useState("");
  let [state, setstate] = useState([]);
  let [loading, setloading] = useState(false);

  useEffect(() => {
    let fetchData = async () => {
      let payload = await Axios.get("/posts");
      setstate(payload.data);
    };
    fetchData();
  }, [id]);

  // let handleChange = async () => {
  //   await Axios.delete(`/posts/${id}`);
  // };
  let mapData = state
    .filter(val => {
      if (searchTerm === "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map(x => {
      return (
        <Fragment key={x.id}>
          <tr>
            <td>{x.id}</td>
            <td>{x.title}</td>
            <td>{x.author}</td>
            <td className="btn-group w-100">
              <div className="btn-group w-100">
                <Link
                  className="btn btn-outline-primary"
                  to={`/edit-post/${x.id}`}
                >
                  edit
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to={`/delete-posts/${x.id}`}
                >
                  Delete
                </Link>
              </div>
            </td>
          </tr>
        </Fragment>
      );
    });
  return (
    <div>
      <h1>Home</h1>
      {loading ? (
        "loading"
      ) : (
        <Fragment>
          <div className="container my-4 btn-light">
            <input
              type="search"
              name="searchTerm"
              placeholder="search..."
              className="form-control"
              value={searchTerm}
              onChange={e => setsearchTerm(e.target.value)}
            />
          </div>
          <div className="container my-4 bg-light p-4">
            <table className="table table-bordered table-hover table-light">
              <thead className="table-dark">
                <tr>
                  <th>id</th>
                  <th>title</th>
                  <th>author</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{mapData}</tbody>
            </table>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
