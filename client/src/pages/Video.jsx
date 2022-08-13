import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { format } from "timeago.js";
import styled from "styled-components";
import {axiosInstance} from "../config.js";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

// import ShareIcon from '@mui/icons-material/Share';
// import SaveAltIcon from '@mui/icons-material/SaveAlt';

import Comments from '../components/Comments';
import Recommendation from '../components/Recommendation';

import { fetchSuccess, like, dislike } from '../redux/videoSlice';
import { subscription } from '../redux/userSlice';

const Container = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Content = styled.div`
  flex: 5;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-right: 1rem;  
`;

const VideoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    // border: 3px solid ${({theme}) => theme.textSoft};
`;

const Title = styled.h1`
    color: ${({theme}) => theme.text};
    font-size: 1rem;
    font-weight: 400;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
`;

const Details = styled.div`
    color: ${({theme}) => theme.text};
    display: flex;
    align-items: flex-end;
    justify-content: end; 
`;

const Info = styled.span`
    color: ${({theme}) => theme.text};
`;

const Buttons = styled.div`
    color: ${({theme}) => theme.text};
    display: flex;
    gap: 1rem;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
`;

const Hr = styled.hr`
  border: 1px solid ${({theme}) => theme.text};
`;


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 1rem;
`;

const Image = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.text};
`;

const ChannelName = styled.span`
  color: ${({theme}) => theme.text};
  font-weight: 500;
  font-size: 1.4rem;
`;

const ChannelCounter = styled.span`
  color: ${({theme}) => theme.text};
  margin-top: 0.5rem;
  font-size: 1.2rem;
`;

const Description = styled.p`
  color: ${({theme}) => theme.text};
  font-size: 1rem;
`;

const Subscribe = styled.button`
  background-color: ${({theme}) => theme.textSoft};
  font-weight: 500;
  color: var(--color-white);
  border: none;
  border-radius: 5px;
  height: max-content;
  cursor: pointer;
  padding: 0.5rem 1rem;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;



function Video() {

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];
  // console.log(path)

  const [channel, setChannel] = useState({});
  const [video, setVideo] = useState({});

  useEffect(()=> {
    const fetchData = async () => {
      try{
          const videoRes = await axiosInstance.get(`/videos/find/${path}`);
          const channelRes = await axiosInstance.get(`/users/find/${videoRes.data.userId}`);

          setChannel(channelRes.data);
          setVideo(videoRes.data);
          dispatch(fetchSuccess(videoRes.data)); 

          console.log(currentVideo);
     
//------------------------------------------------------------------------
        // axiosInstance.get(`/videos/find/${path}`).then((res) => {
          // dispatch(fetchSuccess(res.data));
          
  
          // axiosInstance.get(`/users/find/${res.data.userId}`).then((res) => {
          // setChannel(res.data);
     
          
      }catch(err){}
    } 
    fetchData();
  }, [path, dispatch])


  const handleLike = async () => {
      await axiosInstance.put(`/users/like/${currentVideo._id}`)
      dispatch(like(currentUser._id))
  }

  const handleDislike = async () => {
      await axiosInstance.put(`/users/dislike/${currentVideo._id}`)
      dispatch(dislike(currentUser._id))
  }


  const handleSubscribe = async () => {
      currentUser.subscribedUsers.includes(channel._id) 
        ? await axiosInstance.put(`/users/unsub/${channel._id}`)
        : await axiosInstance.put(`/users/sub/${channel._id}`);
      dispatch(subscription(channel._id));
  }



  return (
    <Container> 
      <Content>
        
        <VideoWrapper>
          <VideoFrame src={video.videoUrl} controls alt="" />
        </VideoWrapper>
       
        <Title>{video.title}</Title>
          <Info>{video.views} views · {format(video.createdAt)}</Info>
        <Details>
        {currentUser && 
          <Buttons>
              <Button onClick={handleLike}>
                {video.likes.includes(channel._id) ? (<ThumbUpIcon />) : (<ThumbUpOffAltIcon />)}
                {" "}
                {(video.likes).length}
              </Button>

              <Button onClick={handleDislike}>
                {video.dislikes.includes(channel._id) ? (<ThumbDownIcon />) : (<ThumbDownOffAltIcon />)}
                {" "}
                Dislike
              </Button>
          </Buttons>
        }
        </Details>

        <Hr />

        <Channel>
          <ChannelInfo>
            <Image src={channel.img} alt="" />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>Subscribers: {channel.subscribers}</ChannelCounter>
              <Description>{video.desc}</Description>
            </ChannelDetail>

          </ChannelInfo>
          {currentUser && 
            <Subscribe onClick={handleSubscribe}>
              {currentUser.subscribedUsers.includes(channel._id)
                ? "SUBSCIBED" : "SUBSCRIBE"
              }

            </Subscribe>
          }
        </Channel>

        <Hr />

        <Comments videoId={currentVideo._id} />

      </Content>

      <Recommendation tags={currentVideo.tags} />

    </Container>
  )
}

export default Video