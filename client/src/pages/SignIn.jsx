import {axiosInstance} from "../config.js";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider} from "../Firebase.js";
import { signInWithPopup } from "firebase/auth";
import logo from "../img/logo.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: ${({theme}) => theme.text};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--color-light);
    border: 1px solid ${({theme}) => theme.text};
    padding: 1rem 3rem;
    color: ${({theme}) => theme.text};
    gap: 0.5rem;
`;

const Image = styled.img`
    height: 3rem;
    width: auto;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
`;

const Title = styled.h1`
    font-size: 1.4rem;
`;

const SubTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: 300;
`;

const Input = styled.input`
    border: 1px solid ${({theme}) => theme.text};
    border-radius: 3px;
    padding: 0.5rem;
    background-color: transparent;
    color: ${({theme}) => theme.text};
    width: 100%;
`;

const Button = styled.button`
    border-radius: 3px;
    border: 1px solid ${({theme}) => theme.text};;
    padding: 0.5rem 1rem;
    font-weight: 500;
    cursor: pointer;
    background-color: var(--color-light);
    color: ${({theme}) => theme.text};
`;

const More = styled.div`
    display: flex;
    font-size: 1rem;
    color: ${({theme}) => theme.text};
    margin-top: 0.5rem;
`;

const Links = styled.div`
    margin-left: 2rem;
   
`;

const Link = styled.span`
    margin-left: 1.5rem;
`;

//---------------------------SignIn------------------------------
const SignIn = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart())
        try{
            const res = await axiosInstance.post("/auth/signin", {name, password});
            dispatch(loginSuccess(res.data))
        } catch(err) {
            dispatch(loginFailure())
        }
    }


    const handleSignup = async (e) => {
        e.preventDefault();
        dispatch(loginStart())
        try{
            const res = await axiosInstance.post("/auth/signup", {name, email, password});
            dispatch(loginSuccess(res.data))
        } catch(err) {
            dispatch(loginFailure())
        }
    }

//-----------------------GoogleSignIn---------------------------
const signInWithGoogle = async () => {
    dispatch(loginStart())

    signInWithPopup (auth, provider).then((result) => {
        axiosInstance.post("/auth/google", {
            name: result.user.displayName, 
            email: result.user.email, 
            img: result.user.photoURL, 
        })
        .then((res) => {dispatch(loginSuccess(res.data))
        })
      
        })
        .catch((err) => {
            dispatch(loginFailure())
        });
};
//--------------------------------------------------------------

  return (
    <Container>
        <Wrapper>
            <Title>Sign In</Title>
            <SubTitle>Videonest<Image src={logo} alt="" />Welcomes</SubTitle>
            <Input placeholder="username" onChange={(e) => setName(e.target.value)}/>
            <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            
            <Button onClick={handleLogin}>Sign In</Button>

            <Title>or</Title>    
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>

            <Title>or</Title>
            <Input placeholder="username" onChange={(e) => setName(e.target.value)}/>
            <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
            <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />

            <Button onClick={handleSignup}>Sign Up</Button>

        </Wrapper>

        <More>
            English (USA)
            <Links> 
                <Link>Help</Link>
                {/* <Link>Privacy</Link>
                <Link>Terms</Link>  */}
            </Links> 
        </More>
    </Container>
  )
}

export default SignIn