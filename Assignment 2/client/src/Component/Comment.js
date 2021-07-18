export default function Comment({ comment }) {
  let date = new Date(comment.createdAt).toDateString();

  return (
    <div className="comment">
      <p>{comment.body}</p>
      <span>By: {comment.user.firstName + " " + comment.user.lastName}</span> ||
      <span> Date: {date}</span>
    </div>
  );
}
