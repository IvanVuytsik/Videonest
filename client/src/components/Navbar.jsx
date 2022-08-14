import React, { useState }  from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useSelector } from 'react-redux';
import Upload from "./Upload"; 
import { useNavigate } from 'react-router-dom';



const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({theme}) => theme.bg};
  height: 4rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%; 
  padding: 0 1rem;
  color: ${({theme}) => theme.text};
  justify-content: flex-end;
  position: relative;
`;

const Search = styled.div`
  color: ${({theme}) => theme.text};
  position: absolute;
  width: 50%;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({theme}) => theme.text};
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  color: ${({theme}) => theme.text};

  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid ${({theme}) => theme.text};
  border-radius: 3px;
  color: ${({theme}) => theme.text};
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;

 
const User = styled.div`
  color: ${({theme}) => theme.text};
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  
  svg {
    color: ${({theme}) => theme.text};

    &:hover {
      color: var(--color-highlight);
      transition: 0.3s ease-in-out 100ms  
    }
  }
`;

const Avatar = styled.img`
  width: 3rem;  
  height: 3rem;
  border-radius: 50%;
  background-color: #999;
`;



function Navbar() {
  const [open, setOpen] = useState(false);
  const {currentUser} = useSelector(state => state.user);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
  <>
    <Container>
      <Wrapper>

        <Search>
          <Input placeholder="Search" onChange={(e) => setQ(e.target.value)}></Input>
          <SearchIcon style={{cursor: "pointer"}} onClick={() => navigate(`/search?q=${q}`)} />
        </Search>

        {currentUser ? (
          <User>
            <VideoCallIcon onClick={() => setOpen(true)} style={{height: "2rem", width: "2rem", cursor: "pointer"}} />
            <Avatar src={currentUser.img} />
            {currentUser.name}
          </User>
         

          ) : (
            <Link to="signin" style={{textDecoration: "none"}}>
              <Button><AccountCircleIcon  />Sign In</Button>
            </Link>
        )}

      </Wrapper>
    </Container>

    {open && <Upload setOpen={setOpen} />}
  </>
  )
}

export default Navbar