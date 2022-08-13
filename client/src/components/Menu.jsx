import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import logo from "../img/logo.png"

import { logout } from '../redux/userSlice';

import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import HistoryIcon from '@mui/icons-material/History';

// import SettingsIcon from '@mui/icons-material/Settings';
// import FlagIcon from '@mui/icons-material/Flag';
// import HelpIcon from '@mui/icons-material/Help';

// import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import SportsScoreIcon from '@mui/icons-material/SportsScore';
// import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
// import TheatersIcon from '@mui/icons-material/Theaters';
// import LiveTvIcon from '@mui/icons-material/LiveTv';
// import RssFeedIcon from '@mui/icons-material/RssFeed';


const Container = styled.div`
    flex: 1;
    background-color: ${({theme}) => theme.bg};
    height: 100vh;
    color: ${({theme}) => theme.text};
    font-size: 1.2rem;
    position: sticky;
    top: 0;
`;

const Wrapper = styled.div`
    padding: 1rem 1.5rem;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 2rem;
`;

const Image = styled.img`
    height: 2.5rem;
    width: auto;
`;

const Item = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 0;

    &:hover{
      background-color: var(--color-light);
      border-radius: 5px;
    }
`;

const Hr = styled.hr`
  margin: 1rem 0;
  border: 0.5px solid ${({theme}) => theme.text};
`;

const Login = styled.div`
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid ${({theme}) => theme.text};
  border-radius: 3px;
  color: ${({theme}) => theme.text};
  cursor: pointer;
  font-weight: 500;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;


const Menu = ({ darkMode, setDarkMode }) => {

  const {currentUser} = useSelector(state => state.user);

  const dispatch = useDispatch()

  const handleLogout = async (e) => {
      e.preventDefault();
      dispatch(logout())
  }



  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{textDecoration:"none", color: "inherit"}}>
          <Logo>
            <Image src={logo} alt="" /> Videonest
          </Logo>
        </Link>


        <Link to="/" style={{textDecoration:"none", color: "inherit"}}>
            <Item><HomeIcon />Home </Item>
        </Link>


        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
            <Item><ExploreIcon /> Explore </Item>
        </Link>


        <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
            <Item><SubscriptionsIcon />Subscriptions </Item>
        </Link>


        {/* <Hr />
        <Item><LibraryBooksIcon />Library </Item>
        <Item><HistoryIcon />History </Item> */}
        <Hr />

        {!currentUser ? (
          <> 
            <Login>
              <Link to="signin" style={{textDecoration: "none"}}>
                <Button><AccountCircleIcon />Sign In</Button>
              </Link>
            </Login>
            <Hr />
          </>
          )
          : (
          <> 
            <Login>
              <Button onClick={handleLogout}><AccountCircleIcon />Sign Out</Button>
            </Login>
            <Hr />
          </>
          )
        }
 
 
        {/* <Item><LibraryMusicIcon /> Music </Item>
        <Item><SportsScoreIcon />Sports </Item>
        <Item><SportsEsportsIcon />Games </Item>
        <Item><TheatersIcon />Movies </Item>
        <Item><RssFeedIcon />News </Item>
        <Item><LiveTvIcon />Live </Item>
        <Hr />
        <Item><SettingsIcon />Settings </Item>
        <Item><FlagIcon />Report </Item>
        <Item><HelpIcon />Help </Item> */}
        {/* <Hr /> */}
        <Item onClick={() => setDarkMode(!darkMode)}><SettingsBrightnessIcon />{darkMode ? "Light" : "Dark"} Mode</Item>

      </Wrapper>
    </Container>
  )
}

export default Menu