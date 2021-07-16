const { Router } = require("express");
const CommentController = require("../controllers/CommentController");
const authMiddleware = require("../middlewares/authMiddleware");

const comments = Router();

// ROUTES
comments.get("/api/comments/:id", CommentController.showAllComments);
comments.post(
  "/api/comments/post-comment/:id",
  authMiddleware,
  CommentController.createComment
);

module.exports = comments;
