const express = require("express");
const router = express.Router();

const auth = require("../config/auth");
const Post = require("../model/post");
const Comment = require("../model/comment");

//All Posts
router.get("/posts", async (req, res, next) => {
  await Post.find({})
    .then((posts) => {
      res.status(200).json({ message: "All posts", posts });
    })
    .catch((err) => {
      next(err);
    });
});
//Get A Post
router.get("/posts/:id", async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findById(postId).populate("comments");
  if (!post) {
    return res.status(400).json({ message: "Post Not Found" });
  } else {
    res.status(200).json({ post });
  }
});
router.post("/newpost", async (req, res, next) => {
  try {
    const { title, image, description, body, fullname, email } = req.body;
    // if ((!title, !image, !description, !body)) {
    //   res.status(500).json({ message: "All inputs are required" });
    // } else {
    const newPost = new Post({
      title: title,
      image: image,
      description: description,
      body: body,
      author: {
        fullname,
        email,
      },
    });
    await newPost
      .save()
      .then((post) => {
        res.status(200).json({ message: "New Post Created!", post });
      })
      .catch((err) => {
        res.status(501).json({ message: err });
      });
    // }
  } catch (err) {
    next(err);
  }
});
//Add Comment to post
router.post("/posts/:id/comment", (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return res.status(501).json({ message: err });
    } else if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      const { firstName, lastName, email, body } = req.body;
      if ((!firstName, !lastName, !email, !body)) {
        return res.status(501).json({ message: "All inputs are required" });
      } else {
        const newComment = new Comment({
          body: body,
          user: {
            firstName: firstName,
            lastName: lastName,
            email: email,
          },
        });
        newComment.save();
        post.comments.push(newComment);
        post.save();
        res.status(201).json({ message: "New comment made", post });
      }
    }
  });
});

module.exports = router;
