import express from 'express';
import { protectRoute } from '../middleware/protectRoute';
import { createPost ,
    deletePost ,
    commentOnPost,
    likeUnlikePost,
    getAllPosts,
    getLikedPosts,
    getFollowingPosts,
    getUserPosts} from "../controllers/post.controllers.js";

const router = express.Router();


router.get("/all",protectRoute,getAllPosts);
router.get("/likes/:id",protectRoute,getLikedPosts);
router.get("/following",protectRoute,getFollowingPosts);
router.get("/user/:username",protectRoute,getUserPosts);
router.post("/create",protectRoute,createPost);
router.delete("/:id",protectRoute,deletePost);
router.post("/like/:id",protectRoute,likeUnlikePost);
router.post("/comment/:id",protectRoute,commentOnPost);

export default router;