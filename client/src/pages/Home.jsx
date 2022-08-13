import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Card from "../components/Card";
import {axiosInstance} from "../config.js";
 

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

function Home({type}) {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
        const res = await axiosInstance.get(`/videos/${type}`);
        setVideos(res.data);
        // console.log(videos)
    }
    fetchVideos()
  }, [type]);

  return (
    <Container> 
      {videos.map((video)=>(
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  )
}

export default Home