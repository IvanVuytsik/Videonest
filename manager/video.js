import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

//-------------------------addvideo-------------------------------
export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try{
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)
    }catch(err){next(err)}
};


//-------------------------updatedVideo-------------------------------
export const updateVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Video not found!"));

        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true })

            res.status(200).json(updatedVideo)
        } else {
            return next(createError(403, "You can update only your video!"));
        }
    }catch(err){next(err)}
}

//-------------------------deletevideo-------------------------------
export const deleteVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Video not found!"));

        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id,  )

            res.status(200).json("Video is deleted now!")
        } else {
            return next(createError(403, "You can delete only your video!"));
        }
    }catch(err){next(err)}
}


//-------------------------getvideo-------------------------------
export const getVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    }catch(err){next(err)}
}


//-------------------------addView-------------------------------
export const addView = async (req, res, next) => {
    try{
        await Video.findById(req.params.id, {
            $inc:{views: 1}
        })
        res.status(200).json("New view!")
    }catch(err){next(err)}
}

//-------------------------random-------------------------------
export const random = async (req, res, next) => {
    try{
        const videos = await Video.aggregate([{$sample: {size: 10}}])
        res.status(200).json(videos)
    }catch(err){next(err)}
}


//-------------------------trend-------------------------------
export const trend = async (req, res, next) => {
    try{
        const videos = await Video.find().sort({views: -1});
        res.status(200).json(videos)
    }catch(err){next(err)}
}


//-------------------------sub-------------------------------
export const sub = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId });
            })
        );
        res.status(200).json(list.flat().sort((a,b) => b.createdAt - a.reatedAt)); //flat removes a nested array

    }catch(err){next(err)}
}


//-------------------------tags-------------------------------
export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",") //js split method
    
    try{
        const videos = await Video.find({ tags:{$in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch(err) { next(err) }
}



//-------------------------search-------------------------------
export const search = async (req, res, next) => {
    const query = req.query.q;
    try{
        const videos = await Video.find({title: { $regex: query, $options: "i" }}).limit(10);
        res.status(200).json(videos)
    }catch(err){next(err)}
}
