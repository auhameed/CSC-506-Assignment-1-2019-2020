import React, { Component } from "react";
import { Route, NavLink, HashRouter, Redirect } from "react-router-dom";
import ShowPost from "./ShowPost";
import Post from "./Post";

export default function Posts({ posts }) {
  return (
    <div>
      <div className="posts">
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
