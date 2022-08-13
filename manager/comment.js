import { createError } from "../error.js";
import Comment from "../models/Comments.js";
import Video from "../models/Video.js";


//--------------------addComment---------------------
export const addComment = async(req, res, next) => {
    const newComment = new Comment({ desc:req.body.desc, videoId:req.body.videoId, userId:req.body.userId })
    try{
        const savedCommnet = await newComment.save()
        res.status(200).send(savedCommnet)
    }catch(err){
        next(err)
    }
}


//--------------------deleteComment---------------------
export const deleteComment = async(req, res, next) => {
    try{
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)

        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Comment is deleted now!")
        }else{
            return next(createError(403, "Can delete only your comment!"))
        }

    }catch(err){
        next(err)
    }
}


//--------------------getComment---------------------
export const getComment = async(req, res, next) => {
    try{
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(comments);
    }catch(err){
        next(err)
    }
}