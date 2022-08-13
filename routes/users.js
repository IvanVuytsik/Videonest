import express from "express";
import { update, deleteUser, getUser, subscribe, unsubscribe, like, dislike } from "../manager/user.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

// update
router.put("/:id", verifyToken, update)

// delete
router.delete("/:id", verifyToken, deleteUser)

// get
router.get("/find/:id", getUser)
// subscribe
router.put("/sub/:id", verifyToken, subscribe)
// unsubscribe
router.put("/unsub/:id", verifyToken, unsubscribe)
// like
router.put("/like/:videoId", verifyToken, like)
// dislike
router.put("/dislike/:videoId", verifyToken, dislike)

export default router;