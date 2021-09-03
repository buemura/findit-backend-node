import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CommentsController } from "../controllers/CommentsController";

const comments = Router();

comments
  .get("/api/comments/:id", CommentsController.showAllComments)
  .post(
    "/api/comments/post-comment/:id",
    authMiddleware,
    CommentsController.createComment
  );

export { comments };
