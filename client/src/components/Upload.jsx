import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import app from "../Firebase.js";
import {axiosInstance} from "../config.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({theme}) => theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 600px;
    height: auto;
    background-color: ${({theme}) => theme.bgLighter};
    color: ${({theme}) => theme.text};
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
`;

const Close = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    font-size: 1.6rem;

    &:hover {
      color: var(--color-highlight);
      transition: 0.3s ease-in-out 100ms  
    }
`;

const Title = styled.h1`
    text-align: center;
`;

const Input = styled.input`
    border: ${({theme}) => theme.bgLighter};
    color: ${({theme}) => theme.text};
    border-radius: 3px;
    padding: 0.5rem;
    background-color: ${({theme}) => theme.bg}; 

    ::placeholder {
      color: ${({theme}) => theme.soft};
    }
`;


const Desc = styled.textarea`
    border: ${({theme}) => theme.bgLighter};
    color: ${({theme}) => theme.text};
    border-radius: 3px;
    padding: 0.5rem;
    background-color: ${({theme}) => theme.bg}; 

    ::placeholder {
      color: ${({theme}) => theme.soft};
    }
`;

const Button = styled.button`
    padding: 5px ;
    background-color: transparent;
    border: 1px solid ${({theme}) => theme.text};
    border-radius: 3px;
    color: ${({theme}) => theme.text};
    cursor: pointer;
    font-weight: 500;
`;

const Label = styled.label`
    font-size: 1.2rem;
    color: ${({theme}) => theme.text};
`;



const Upload = ({setOpen}) => {

    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgLoading, setImgLoading] = useState(0);
    const [videoLoading, setVideoLoading] = useState(0);

 
    const [input, setInput] = useState({});
    const [tags, setTags] = useState([]);


    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput(prev => {
            return {...prev, [e.target.name]: e.target.value};
        })
    };


    const handleTags = (e) => {
        setTags(e.target.value.split(","))
    };


//uses firebase example 
    const uploadFile = (file, urlType) => {
        const storage = getStorage(app); //passing as default app from Firebase.js
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
    urlType === "imgUrl" ? setImgLoading(Math.round(progress)) : setVideoLoading(Math.round(progress));


    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;

      default: 
        break;
    }
  }, 
  (error) => {},

  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInput((prev) => {
                return {...prev, [urlType]: downloadURL}
            });
        });
    }
    )
};


  useEffect(() => { video && uploadFile(video, "videoUrl")}, [video]);
  useEffect(() => { img && uploadFile(img, "imgUrl")}, [img]);   


//------------------------------uploading to DB--------------------------
  const handleUpload = async (e) => {
        e.preventDefault()
        const res = await axiosInstance.post("/videos", {...input, tags})
        setOpen(false)
        const isUploaded = await axiosInstance.get(`/videos/find/${res.data._id}`);
        isUploaded && navigate(`/video/${res.data._id}`, {state: {linkData: res.data}});
        
    };
//-----------------------------------------------------------------------

  return (
    <Container>
        <Wrapper>
            <Close onClick={() => setOpen(false)}>X</Close>
            <Title>Upload a New Video</Title>
            <Label>Video:</Label>

            { videoLoading > 0 ? ("Uploading:" + videoLoading + "%") : (
                <Input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])}/>
            )}

            <Input type="text" placeholder="Title..." name="title" onChange={handleChange}/>
            <Desc placeholder="Description..." rows={10} name="desc" onChange={handleChange}/>
            <Input type="text" placeholder="Separate tags with commas..." onChange={handleTags}/>

            <Label>Image:</Label>
            { imgLoading > 0 ? ("Uploading:" + imgLoading + "%") : (
                <Input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])}/>
            )}

            <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>

    </Container>
  )
}

export default Upload