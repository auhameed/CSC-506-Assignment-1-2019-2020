import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Comment from "./Comment";

export default function ShowPost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      const post = res.data.post;
      const author = res.data.post.author;
      const comments = res.data.post.comments;
      setPost(post);
      setAuthor(author);
      setComments(comments);
    };
    getPost();
  }, [path]);

  const commentSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        "http://localhost:4000/posts/" + path + "/comment",
        {
          firstName,
          lastName,
          email,
          body,
        }
      );
      res.data && window.location.reload();
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="showPost">
      {
        // (post.image = null ? (
        //   <img
        //     src="https://cdn.pixabay.com/photo/2019/01/03/19/24/landscape-3911734__340.jpg"
        //     alt="post display"
        //   />
        // ) : (
        //   <img src={post.image} alt="post display" />
        // ))
        <img
          src="https://cdn.pixabay.com/photo/2019/01/03/19/24/landscape-3911734__340.jpg"
          alt="post display"
        />
      }
      <div>
        <h2>{post.title}</h2>
        <br />
        <p>
          Date: {new Date(post.createdAt).toDateString()} | Post By:
          {author.fullname}
        </p>
        <br />
        <p>{post.body}</p>
      </div>
      <div className="comments">
        <h3>Comments({comments.length})</h3>
        <hr />
        {comments.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
        <div className="postComment">
          {error ? (
            <span style={{ color: "red" }}>Something went wrong!</span>
          ) : null}
          <form onSubmit={commentSubmit}>
            <h4>Leave A Comment</h4>
            <hr />
            <label>First Name</label>
            <br />
            <input
              type="text"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <label>Last Name</label>
            <br />
            <input
              type="text"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <label>Email</label>
            <br />
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Comment</label>
            <br />
            <textarea name="body" onChange={(e) => setBody(e.target.value)} />
            <br />
            <button type="submit">Send Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
}
