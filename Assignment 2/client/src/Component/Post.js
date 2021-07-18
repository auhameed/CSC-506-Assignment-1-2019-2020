import { Link } from "react-router-dom";

export default function Post({ post }) {
  let date = new Date(post.createdAt).toDateString();
  return (
    <div>
      <article className="post">
        <Link to={`/posts/${post._id}`}>
          <h3>{post.title}</h3>
        </Link>
        <img
          src="https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284__340.jpg"
          alt="post display"
        />
        <p>
          <span>Author: {post.author.fullname}</span> | Date: {date}
        </p>
        <p>{post.description}</p>
        <Link to={`/posts/${post._id}`}>
          <p className="button">
            Read More <strong>{">"}</strong>
          </p>
        </Link>
      </article>
    </div>
  );
}
