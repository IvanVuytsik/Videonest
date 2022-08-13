import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import {axiosInstance} from "../config.js";
// import avatar from "../img/avatar.png";

 

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "20rem"};
  margin-bottom: ${(props) => props.type === "sm" ? "0.5rem" : "2rem"};
  margin-left: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 1rem;
`;

const Image = styled.img`
  width: ${(props) => props.type === "sm" ? "8rem" : "100%"};
  height: ${(props) => props.type === "sm" ? "8rem" : "12rem"}; ;
  background-color: ${({theme}) => theme.bg};
  flex: 1.5;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "1rem"};
  margin-right: 0.5rem;
  gap: 0.5rem;
  flex: 1;
`;

const ChannelImage = styled.img`
  margin-top: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({theme}) => theme.bg};
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  
`;

const Title = styled.h1`
  margin-top: ${(props) => props.type === "sm" ? "0" : "0.5rem"};
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({theme}) => theme.textSoft};
`;

const ChannelName = styled.h2`
  font-size: 1.2rem;
  color: ${({theme}) => theme.textSoft};
  margin: 0.5rem 0rem;
`;

const Info = styled.div`
  font-size: 1rem;
  color: ${({theme}) => theme.textSoft};
`;



function Card({type, video}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
        const res = await axiosInstance.get(`/users/find/${video.userId}`);
        setUser(res.data);
        // console.log(videos)
    }
    fetchUser()
  }, [video.userId]);


  return (

  <Link to={`api/video/${video._id}`} style={{textDecoration:"none"}}>
    <Container type={type}>
      <Image type={type} src={video.imgUrl} alt="" />

      {user &&
        <Details type={type}>
          <ChannelImage type={type} src={user.img} alt=""/>
          {/* Views: {video.views} ·  */}
          <Texts>
            <Title> {video.title} </Title>
            <Info> Posted: {format(video.createdAt)} </Info> 
            <ChannelName> {user.name} </ChannelName>
          </Texts>

        </Details>
      }

    </Container>
  </Link>

  )
}

export default Card