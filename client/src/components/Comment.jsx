import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import {axiosInstance} from "../config.js";
import { format } from "timeago.js";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from 'react-redux';


const Container = styled.div`
    display: flex;
    gap: 0.5rem;
    margin: 2rem 0rem;
    color: ${({theme}) => theme.text};
`;

const Avatar = styled.img`
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Name = styled.span`
    color: ${({theme}) => theme.text};
    font-size: 1.2rem;
    font-weight: 500;
`;

const Date = styled.span`
    color: ${({theme}) => theme.textSoft}; 
    font-size: 1rem;
    font-weight: 400;
    margin-left: 0.5rem;
`;

const Text = styled.span`
    color: ${({theme}) => theme.text};
    font-size: 1rem;
`;



const Comment = ({comment, videoId}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [user, setUser] = useState({});


    useEffect(()=> {
    const fetchData = async () => {
      try{
          axiosInstance.get(`/users/find/${comment.userId}`).then((res) => {
          setUser(res.data)});
      }catch(err){}
    } 
    fetchData();
  }, [comment.userId])



//-------------------------deletecomment--------------------
    const handleDeleteComment = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.delete(`/comments/${comment._id}`);
            
        }catch(err){}
    };


  return (
    
    <Container>
            <Avatar src={user.img} alt="" />

            <Details>
                <Name>{user.name} <Date>{format(comment.createdAt)}</Date></Name>
                <Text>
                    {comment.desc}
                </Text>
            </Details>

            { currentUser && 
                <DeleteForeverIcon onClick={handleDeleteComment} style={{cursor: "pointer"}}/> 
            }
    </Container>
  )
}

export default Comment