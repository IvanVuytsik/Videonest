import { json } from "express";
import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

//-------------------------updateuser------------------------
export const update = async (req, res, next) => {
    if(req.params.id === req.user.id){ //req.params - users param / user.id from jwt
            try{
               const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body
                }, { new: true } );
                res.status(200).json(updateUser)
            }catch(err){
            next(err)
            }
    } else { 
        return next(createError(403, "Can update only your account!"))
    }
}   


//---------------------------deleteuser------------------------
export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id){ 
            try{
                await User.findByIdAndDelete(req.params.id, {
                });
                res.status(200).json("User is deleted now!")
            }catch(err){
            next(err)
            }
    } else { 
        return next(createError(403, "Can delete only your account!"))
    }
}   


//----------------------------getuser-----------------------
export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
};


//---------------------------subuser-------------------------
export const subscribe = async (req, res, next) => {
    try{
        await User.findByIdAndUpdate(req.user.id, {
            $push:{subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc:{subscribers: 1},
        })
        res.status(200).json("Subscription successfull")
    }catch(err){
        next(err)
    }
}   


//---------------------------unsubuser-----------------------
export const unsubscribe = async (req, res, next) => {
    try{
        await User.findByIdAndUpdate(req.user.id, {
            $pull:{ subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc:{ subscribers: -1 },
        });
        res.status(200).json("Unsubscribed successfully")
    }catch(err){
        next(err)
    }
}   


//------------------------likeuser--------------------
export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;

    try{
        await Video.findByIdAndUpdate(videoId, {
            $addToSet:{ likes:id },    //addToSet - adds only once
            $pull:{ dislikes:id }
        })
        res.status(200).json("Liked video!")

    }catch(err){
        next(err)
    }
}   


//-------------------------disliketuser--------------------
export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;

    try{
        await Video.findByIdAndUpdate(videoId, {
            $addToSet:{ dislikes:id },    //addToSet - adds only once
            $pull:{ likes:id }
        })
        res.status(200).json("Disliked video!")

    }catch(err){
        next(err)
    }
}   
