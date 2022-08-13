import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import {axiosInstance} from "../config.js";
import Comment from './Comment';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';


const Container = styled.div``;

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({theme}) => theme.text};
`;

const Avatar = styled.img`
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
`;

const Input = styled.input`
    color: ${({theme}) => theme.text};
    border: none;
    border-bottom: 1px solid ${({theme}) => theme.text};
    background-color: transparent;
    outline: none;
    padding: 0.5rem;
    width: 100%;
`;

const Comments = ({videoId}) => {
    const { currentUser } = useSelector((state) => state.user);
    
    const [comments, setComments] = useState([]);
    const [desc, setDesc] = useState("");
    const [userId, setUserId] = useState("");


    
    // const userId = undefined;
    useEffect(() => { 
        currentUser ? setUserId(currentUser._id) : setUserId("");
        }, [currentUser])
  

    useEffect(() => {
        const fetchComments = async () => {
            try {
                axiosInstance.get(`/comments/${videoId}`).then((res) => { 
                setComments(res.data)});
            } catch (err) {}
        };
        fetchComments();
    }, [videoId]);

//-------------------------addcomment--------------------
    const handleAddComment = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post(`/comments`, {desc, videoId, userId});
           
        }catch(err){}
    };
    // console.log(userId, videoId)
    // console.log(desc)
 

  return (

    <Container>
        {currentUser &&

            <NewComment>
                <Avatar src={currentUser.img} alt="" />
                <Input placeholder="Add a comment..." onChange={(e) => setDesc(e.target.value)} />
                <AddIcon onClick={handleAddComment} style={{cursor: "pointer"}}/> 
            </NewComment>
        }

        {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} videoId={videoId} />
        ))}
    </Container>
  )
}

export default Comments